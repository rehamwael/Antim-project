import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label , Color } from 'ng2-charts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import {latLng, tileLayer} from 'leaflet';

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
  userAddress: any;
  name: any;
  email: any;
  phone: any;
  NID: any;
  address: any;
  city: any;
  country: any;
  zip: any;
  state: any;
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
  AddressForm: FormGroup;
  disabledBankButton = true;
  showProfit = false ; // hidden by default
  showAddress = false ;
  showBank = false ;
  showUser = false ;
  disableprofileButton = false;
  disableBankButton = false;
  disableAddressButton = false;

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
    private profileService: ProfileService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {
      this.showUser = true;
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
        Validators.minLength(10)
      ])],
      'Address': [{value: null, disabled: this.disabledButton}],
      });


      this.BankInfoForm = fb.group({
        'BankName': ['', {disabled: this.disabledBankButton}],
        'BankAccountNo': ['', {disabled: this.disabledBankButton}],
        'AccountTitle': ['', {disabled: this.disabledBankButton}],
        'BankAddress': ['', {disabled: this.disabledBankButton}],
        'investmentPerYear': ['', {disabled: this.disabledBankButton}],
        });
        this.leafletLayers = [tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { })];
        this.mapCenter = latLng(24.8085046, 46.6711241);
        this.zoomLevel = 7;

        this.AddressForm = fb.group({
          'Address': [{value: this.address, disabled: this.disabledButton}, Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])],
          'City':  [{value: this.city, disabled: this.disabledButton}, Validators.compose([
            Validators.required,
            Validators.minLength(4)
          ])],
          'Country':  [{value: this.country, disabled: this.disabledButton}, Validators.compose([
            Validators.required,
            Validators.minLength(4)
          ])],
          'State': [{value: this.state, disabled: this.disabledButton}, Validators.compose([
            Validators.required,
            Validators.minLength(4)
          ])],
          'Zip':  [{value: this.zip, disabled: this.disabledButton}, Validators.compose([
            Validators.required
          ])],
          });


  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}
showErrorToast(title, message, type) {
  this.toastr.show(message, title, this.options, 'toast-' + type);
}


  ngOnInit(): void {
    this.profileService.getUserData().subscribe(res => {
      this.currentUser = res.result;
      this.NID = res.result.nationalIdNumber;
      this.phone = res.result.phoneNumber;
      this.email = res.result.email;
      this.name = res.result.firstName;
      this.userAddress = res.result.userAddresses;
      console.log('user:', res);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('AccountTitle').disable();
    this.BankInfoForm.get('BankAddress').disable();
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
    this.disableprofileButton = true;
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
    this.disableBankButton = true;
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountNo').enable();
    this.BankInfoForm.get('AccountTitle').enable();
    this.BankInfoForm.get('BankAddress').enable();
    this.BankInfoForm.get('investmentPerYear').enable();
  }
  SaveBankInfo() {
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('AccountTitle').disable();
    this.BankInfoForm.get('BankAddress').disable();
    this.BankInfoForm.get('investmentPerYear').disable();
  }

  onChange(deviceValue: any) {
      if (deviceValue === 'Personal') {
        this.showUser = true;
        this.showBank = false;
        this.showAddress = false;
        this.showProfit = false;
      } else {
        this.showUser = false;
      }
        if (deviceValue === 'Bank') {
          this.showUser = false;
          this.showBank = true;
          this.showAddress = false;
          this.showProfit = false;
        } else {
          this.showBank = false;
        }
        if (deviceValue === 'TotalProfit') {
          this.showUser = false;
          this.showBank = false;
          this.showAddress = false;
          this.showProfit = true;
        } else {
          this.showProfit = false;
        }
        if (deviceValue === 'funderAddress') {
          this.showUser = false;
          this.showBank = false;
          this.showAddress = true;
          this.showProfit = false;
        } else {
          this.showAddress = false;
        }
  }
  EditAddressInfo() {
    this.disableAddressButton = true;
    this.AddressForm.get('Address').enable();
    this.AddressForm.get('City').enable();
    this.AddressForm.get('Country').enable();
    this.AddressForm.get('State').enable();
    this.AddressForm.get('Zip').enable();
  }
  SaveAddressInfo() {
  if (this.userAddress.length > 0) {
        this.spinner.show();
        this.profileService.editUserAddress({
        'Address': this.address,
        'City': this.city,
        'Country': this.country,
        'State': this.state,
        'PostalCode': this.zip
      }).subscribe((res) => {
        console.log('edit Address:', res);
        this.spinner.hide();
          this.showSuccessToast('OK!!', res.message, 'success');
      }, err => {
        this.spinner.hide();
        this.showErrorToast('Error!!', err.message, 'error');
      });
    } else {
          this.spinner.show();
          this.profileService.addUserAddress({
          'Address': this.address,
          'City': this.city,
          'Country': this.country,
          'State': this.state,
          'PostalCode': this.zip
        }).subscribe((res) => {
          console.log('Add Address:', res);
          this.spinner.hide();
            this.showSuccessToast('OK!!', res.message, 'success');
        }, err => {
        this.spinner.hide();
        this.showErrorToast('Error!!', err.message, 'error');
      });
    }
    this.AddressForm.get('Address').disable();
    this.AddressForm.get('City').disable();
    this.AddressForm.get('Country').disable();
    this.AddressForm.get('State').disable();
    this.AddressForm.get('Zip').disable();
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

