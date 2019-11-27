import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label , Color } from 'ng2-charts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import {latLng, tileLayer} from 'leaflet';

import { UserDataService } from '../services/userData.service';
import { ProfileService } from '../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';


@Component({
  selector: 'app-profile-lender',
  templateUrl: './profile-lender.component.html',
  styleUrls: ['./profile-lender.component.css']
})
export class ProfileLenderComponent implements OnInit, OnDestroy {
  currentUser: any;
  name: any;
  email: any;
  phone: any;
  NID: any;
  options: IndividualConfig;
  phoneNumber: any;
  numberEntered = false;
  disableButton = false;

  leafletLayers;
  leafletOptions;
  mapCenter;
  zoomLevel;

  disabledButton = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  isShown = false ; // hidden by default
  disabledBankButton = true;
  showProfit = false ; // hidden by default
  public barChartOptions: ChartOptions = {
    responsive: true,
      legend: {
        display: false
      },
    scales: { xAxes: [{
      barPercentage: 0.2
    }], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };
  public barChartLabels: Label[] = ['2014', '2016', '2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Total Fund' },
    { data: [28, 48, 40, 19, 86], label: 'Total Profit' }
  ];





  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    public router: Router,
    private userDataService: UserDataService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {
      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-bottom-right';
      this.options.timeOut = 5000;

    this.EditForm = fb.group({
      'Name': [{value: this.name, disabled: this.disabledButton}, Validators.compose([
        Validators.required
      ])],
      'MobileNo':  [{value: this.phone, disabled: this.disabledButton}, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
      'Email':  [{value: this.email, disabled: this.disabledButton}, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'NID': [{value: this.NID, disabled: this.disabledButton}, Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      'Address': [{value: null, disabled: this.disabledButton}],
      });


      this.BankInfoForm = fb.group({
        'BankName': ['', {disabled: this.disabledBankButton}],
        'BankAccountName': ['', {disabled: this.disabledBankButton}],
        'investmentPerYear': ['', {disabled: this.disabledBankButton}],
        });
        this.leafletLayers = [tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { })];
        this.mapCenter = latLng(24.8085046, 46.6711241);
        this.zoomLevel = 7;


  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}
showErrorToast(title, message, type) {
  this.toastr.show(message, title, this.options, 'toast-' + type);
}


  ngOnInit(): void {
    this.userDataService.getUserData().subscribe(res => {
      this.currentUser = res;
      this.NID = res.nationalIdNumber;
      this.phone = res.email;
      this.email = res.phoneNumber;
      this.name = res.firstName;
      console.log('user:', res);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('investmentPerYear').disable();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('profile');

  }
  formatLabel(value: number) {
      return Math.round(value) + 'SAR';
  }
  EditInfo() {
    this.disableButton = true;

    this.EditForm.get('Name').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('NID').enable();
    this.EditForm.get('Address').enable();


  }
  SaveInfo() {
    this.spinner.show();
    this.profileService.editUser({
        'FirstName': this.name,
        'NationalIdNumber': this.NID,
        'PhoneNumber': this.phone.toString(),
        'Email': this.email
  }).subscribe((res) => {
    this.spinner.hide();
      this.showSuccessToast('OK!!', res, 'success');
  }, err => {
    this.spinner.hide();
    this.showErrorToast('Error!!', err.error, 'error');
  });

    this.EditForm.get('Name').disable();
    this.EditForm.get('MobileNo').disable();
    this.EditForm.get('Email').disable();
    this.EditForm.get('NID').disable();
    this.EditForm.get('Address').disable();
  }
  EditBankInfo() {
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountName').enable();
    this.BankInfoForm.get('investmentPerYear').enable();
  }
  SaveBankInfo() {
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('investmentPerYear').disable();
  }
  onChange(deviceValue) {
      if (deviceValue === 'Bank') {
        this.isShown = ! this.isShown;
      } else {
        this.isShown = ! this.isShown;
      }
      if (deviceValue === 'TotalProfit') {
        this.showProfit = true;
      } else {
        this.showProfit = false;

      }
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  inputNumber(event) {
    this.phoneNumber = event.target.value;
    if (this.phoneNumber.length >= 9) {
    this.numberEntered = true;
    } else {
      this.numberEntered = false;
    }
  }

  // tslint:disable-next-line: member-ordering
  public barChartColors: Color[] = [
    { backgroundColor: '#39A4E9' },
    { backgroundColor: '#5C20D2' },
  ];
}

