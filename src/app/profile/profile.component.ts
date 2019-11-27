import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import {latLng, tileLayer} from 'leaflet';
import { ProfileService } from '../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , OnDestroy {
  currentUser: any;
  name: any;
  email: any;
  phone: any;
  NID: any;
  disabledButton = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  isShown = false ; // hidden by default
  disabledBankButton = true;
  zoom: number;
  center: L.LatLng;
  fitBounds: L.LatLngBounds;
  baseLayers: L.TileLayer[];
  leafletLayers;
  leafletOptions;
  mapCenter;
  zoomLevel;
  options: IndividualConfig;
  phoneNumber: any;
  numberEntered = false;
  disableButton = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
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
        'EmailAdd': ['', {disabled: this.disabledBankButton}],
        'Iqama': ['', {disabled: this.disabledBankButton}],
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
    this.profileService.getUserData().subscribe(res => {
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
    this.BankInfoForm.get('EmailAdd').disable();
    this.BankInfoForm.get('Iqama').disable();
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
    this.BankInfoForm.get('EmailAdd').enable();
    this.BankInfoForm.get('Iqama').enable();
  }
  SaveBankInfo() {
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('EmailAdd').disable();
    this.BankInfoForm.get('Iqama').disable();
  }
  onChange(deviceValue) {
      if (deviceValue === 'Bank') {
        this.isShown = ! this.isShown;
      } else {
        this.isShown = ! this.isShown;
      }
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }
  inputNumber(event) {
    this.phoneNumber = event.target.value;
    if (this.phoneNumber.length >= 9) {
    this.numberEntered = true;
    } else {
      this.numberEntered = false;
    }
  }
}
