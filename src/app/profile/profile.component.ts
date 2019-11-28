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
  disabledButton = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  AddressForm: FormGroup;
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
  disableprofileButton = false;
  disableBankButton = false;
  disableAddressButton = false;
  showAddress = false ;
  showBank = false ;
  showUser = false ;


  constructor(
    private fb: FormBuilder,
    public router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {

      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-top-right';
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
      // 'Address': [{value: null, disabled: this.disabledButton}],
      });

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


      this.BankInfoForm = fb.group({
        'BankName': ['', {disabled: this.disabledBankButton}],
        'BankAccountNo': ['', {disabled: this.disabledBankButton}],
        'AccountTitle': ['', {disabled: this.disabledBankButton}],
        'Address': ['', {disabled: this.disabledBankButton}],
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
     this.showUser = true;
    this.profileService.getUserData().subscribe(res => {
      this.currentUser = res.result;
      this.NID = res.result.nationalIdNumber;
      this.phone = res.result.phoneNumber;
      this.email = res.result.email;
      this.name = res.result.firstName;
      this.userAddress = res.result.userAddresses;
      // if (this.userAddress.length > 0) {
      //   this.showButton = true;
      // } else {
      //   this.showButton = false;
      // }
      console.log('user:', res);
    });
    // this.profileService.getUserAddress().subscribe(res => {
    //   this.userAddress = res.result;
    //   console.log('userAddress:', this.userAddress);
    // });


    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('AccountTitle').disable();
    this.BankInfoForm.get('Address').disable();
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
    this.disableprofileButton = true;
    this.EditForm.get('Name').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('NID').enable();
    // this.EditForm.get('Address').enable();


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
      this.showSuccessToast('OK!!', res.message, 'success');
  }, err => {
    this.spinner.hide();
    this.showErrorToast('Error!!', err.message, 'error');
  });
    this.EditForm.get('Name').disable();
    this.EditForm.get('MobileNo').disable();
    this.EditForm.get('Email').disable();
    this.EditForm.get('NID').disable();
    // this.EditForm.get('Address').disable();
  }
  EditBankInfo() {
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountNo').enable();
    this.BankInfoForm.get('AccountTitle').enable();
    this.BankInfoForm.get('Address').enable();
  }
  SaveBankInfo() {
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('AccountTitle').disable();
    this.BankInfoForm.get('Address').disable();
  }
  onChange(deviceValue) {
    if (deviceValue === 'Personal') {
      this.showUser = true;
      this.showBank = false;
      this.showAddress = false;
    } else {
      this.showUser = false;
    }
      if (deviceValue === 'Bank') {
        this.showUser = false;
        this.showBank = true;
        this.showAddress = false;
      } else {
        this.showBank = false;
      }
      if (deviceValue === 'address') {
        this.showUser = false;
      this.showBank = false;
      this.showAddress = true;
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
  inputNumber(event) {
    this.phoneNumber = event.target.value;
    if (this.phoneNumber.length >= 9) {
    this.numberEntered = true;
    } else {
      this.numberEntered = false;
    }
  }
}
