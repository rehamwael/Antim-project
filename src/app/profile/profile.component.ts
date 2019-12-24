import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { latLng, tileLayer } from 'leaflet';
import { ProfileService } from '../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { EditUserProfile } from './../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('two', { static: false }) twoElement: ElementRef;
  @ViewChild('three', { static: false }) threeElement: ElementRef;
  @ViewChild('four', { static: false }) fourElement: ElementRef;

  currentUser: any;
  // userAddress: any = [];
  userAddress: any;
  userBankInfo: any;
  userId: any;
  userName: any;
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  countryCode: any;
  NID: any;
  address: any;
  city: any;
  country: any;
  zip: any;
  state: any;
  addressID: any;
  bankID: any;
  bankName: any;
  bankAccountNo: any;
  bankAddress: any;
  accountTitle: any;

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
  emailButton = false;
  phoneButton = false;
  disableBankButton = false;
  disableAddressButton = false;
  disablePasswordButton = false;
  showAddress = false;
  showBank = false;
  showUser = false;
  BankArray: any;
  AddressArray: any;
  getState: Observable<any>;
  showOTPstep = false;
  OTP: any;
  first: number;
  second: number;
  third: number;
  Fourth: number;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    public router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private editUserService: UserEmailPasswordService
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;

    this.EditForm = fb.group({
      'FirstName': [{ value: this.firstName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'LastName': [{ value: this.lastName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'UserName': [{ value: this.userName, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'MobileNo': [{ value: this.phone, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        // Validators.minLength(9)
      ])],
      'Email': [{ value: this.email, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'NID': [{ value: this.NID, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      'CountryCode': [{ value: this.countryCode, disabled: this.disabledButton }, Validators.compose([
        Validators.required
      ])],
      'One': [''],
      'Two': [''],
      'Three': [''],
      'Four': [''],
      'OldPassword': [{ value: this.oldPassword, disabled: this.disabledButton },
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'NewPassword': [{ value: this.newPassword, disabled: this.disabledButton },
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'ConfirmPassword': [{ value: this.confirmPassword, disabled: this.disabledButton }]

      // 'Address': [{value: null, disabled: this.disabledButton}],
    });

    this.AddressForm = fb.group({
      'Address': [{ value: this.address, disabled: this.disabledButton }, Validators.compose([
        // Validators.required,
        Validators.minLength(6)
      ])],
      'City': [{ value: this.city, disabled: this.disabledButton }, Validators.compose([
        // Validators.required,
        Validators.minLength(4)
      ])],
      'Country': [{ value: this.country, disabled: this.disabledButton }, Validators.compose([
        // Validators.required,
        Validators.minLength(4)
      ])],
      'State': [{ value: this.state, disabled: this.disabledButton }, Validators.compose([
        // Validators.required,
        Validators.minLength(4)
      ])],
      'Zip': [{ value: this.zip, disabled: this.disabledButton }, Validators.compose([
        // Validators.required
      ])],
    });


    this.BankInfoForm = fb.group({
      'BankName': [{ value: this.bankName, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        // Validators.minLength(4)
      ])],
      'BankAccountNo': [{ value: this.bankAccountNo, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      'AccountTitle': [{ value: this.accountTitle, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      'BankAddress': [{ value: this.bankAddress, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
    });
    this.leafletLayers = [tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {})];
    this.mapCenter = latLng(24.8085046, 46.6711241);
    this.zoomLevel = 7;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  getUserINFO() {
    return new Promise((resolve, reject) => {
      this.profileService.getUserData().subscribe(res => {
        this.currentUser = res.result;
        this.NID = res.result.nationalIdNumber;
        this.phone = res.result.phoneNumber;
        this.email = res.result.email;
        this.firstName = res.result.firstName;
        this.lastName = res.result.lastName;
        this.userName = res.result.userName;
        this.countryCode = res.result.dialingCode;
        resolve(res);
        this.userId = res.result.id;
        this.AddressArray = res.result.userAddresses;
        this.BankArray = res.result.userBanks;
        console.log('userINFO:', res.result);

      }, err => {
        console.log('ERROR:', err);
        reject(err);
      });
    });
  }

  ngOnInit(): void {
    this.showUser = true;
    this.spinner.show();
    this.getUserINFO().then(e => {
      if (this.AddressArray.length > 0) {
      this.profileService.getUserAddress().subscribe(res => {
        this.userAddress = res.result;
        this.address = res.result.address;
        this.city = res.result.city;
        this.country = res.result.country;
        this.zip = res.result.postalCode;
        this.state = res.result.state;
        this.addressID = res.result.id;
        console.log('userAddressINFO:', res.result);

      }, err => {
        console.log('ERROR:', err);
      });
    }
    if (this.BankArray.length > 0) {
      this.profileService.getUserBankInfo().subscribe(res => {
        this.userBankInfo = res.result;
        this.bankName = res.result.bankName;
        this.bankAddress = res.result.address;
        this.accountTitle = res.result.accountTitle;
        this.bankAccountNo = res.result.accountNumber;
        this.bankID = res.result.id;
        console.log('userBankInfo:', this.userBankInfo);
      }, err => {
        console.log('ERROR:', err);
      });
    }
      this.spinner.hide();
    });

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('AccountTitle').disable();
    this.BankInfoForm.get('BankAddress').disable();
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
    this.emailButton = true;
    this.phoneButton = true;
    this.EditForm.get('FirstName').enable();
    this.EditForm.get('LastName').enable();
    this.EditForm.get('UserName').enable();
    this.EditForm.get('NID').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('CountryCode').enable();
  }

  editEmail() {
    if (this.email == '') {
      this.showErrorToast('Error!!', 'Please Enter Email.', 'error');
    } else {
      this.spinner.show();
      this.editUserService.editUserEmail({
        'Id': this.userId,
        'NewEmail': this.email,
        'UserName': this.userName
      }).subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.emailButton = false;
        this.EditForm.get('Email').disable();
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    }
  }

  editMobileNo() {
    if (this.phone == '' || this.countryCode == null) {
      this.showErrorToast('Error!!', 'Please Enter Proper Mobile Number.', 'error');
    } else {
      this.spinner.show();
      this.profileService.editUserPhoneNumber({
        'Id': this.userId,
        'PhoneNumber': this.phone,
        'DialingCode': this.countryCode
      }).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        this.showSuccessToast('OK!!', res.message, 'success');
        this.phoneButton = false;
        this.showOTPstep = true;
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    }
  }
  keytab(event, next) {
    if (next === 1) {
      setTimeout(() => {
        this.twoElement.nativeElement.focus();
      }, 0);
    } else if (next === 2) {
      setTimeout(() => {
        this.threeElement.nativeElement.focus();
      }, 0);
    } else if (next === 3) {
      setTimeout(() => {
        this.fourElement.nativeElement.focus();
      }, 0);
    }
  }
  verifyOTP() {
    this.OTP = '' + this.first + this.second + this.third + this.Fourth;
    this.spinner.show();
    this.profileService.confirmNewPhoneNumber({
      'Id': this.userId,
      'VerificationCode': this.OTP,
      'PhoneNumber': this.phone,
      'DialingCode': this.countryCode
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
      this.showOTPstep = false;
      this.EditForm.get('MobileNo').disable();
      this.EditForm.get('CountryCode').disable();
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  ResendOTP() {
    this.spinner.show();
    this.profileService.resendOtpForPhoneNumber({
      'Id': this.userId,
      'PhoneNumber': this.phone,
      'DialingCode': this.countryCode
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

  SaveInfo() {
    const actionPayload = {
      'FirstName': this.firstName,
      'LastName': this.lastName,
      'UserName': this.userName,
      'NationalIdNumber': this.NID,
      // 'PhoneNumber': this.phone.toString(),
      // 'Email': this.email
    };
    this.store.dispatch(new EditUserProfile(actionPayload));
    this.EditForm.get('FirstName').disable();
    this.EditForm.get('LastName').disable();
    this.EditForm.get('UserName').disable();
    this.EditForm.get('NID').disable();
    this.disableprofileButton = false;


  }
  EditBankInfo() {
    this.disableBankButton = true;
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountNo').enable();
    this.BankInfoForm.get('AccountTitle').enable();
    this.BankInfoForm.get('BankAddress').enable();
  }
  SaveBankInfo() {
    if (this.BankArray.length > 0) {
      this.spinner.show();
      this.profileService.editUserBankInfo({
        'id': this.bankID,
        'BankName': this.bankName,
        'Address': this.bankAddress,
        'AccountTitle': this.accountTitle,
        'AccountNumber': this.bankAccountNo
      }).subscribe((res) => {
        console.log('Bank Info edited:', res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('BankAddress').disable();
        this.disableBankButton = false;
      }, err => {
        console.log('ERROR', err);
        this.spinner.hide();
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    } else {
      this.spinner.show();
      this.profileService.addUserBankInfo({
        'BankName': this.bankName,
        'Address': this.bankAddress,
        'AccountTitle': this.accountTitle,
        'AccountNumber': this.bankAccountNo
      }).subscribe((res) => {
        console.log('BANK Added:', res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('BankAddress').disable();
        this.disableBankButton = false;
      }, err => {
        console.log('ERROR', err);
        this.spinner.hide();
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
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
    if (this.AddressArray.length > 0) {
      this.spinner.show();
      this.profileService.editUserAddress({
        'Id': this.addressID,
        'Address': this.address,
        'City': this.city,
        'Country': this.country,
        'State': this.state,
        'PostalCode': this.zip
      }).subscribe((res) => {
        console.log('Address info edited:', res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
      }, err => {
        this.spinner.hide();
        this.showErrorToast('Error!!', err.error.message, 'error');
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
        console.log('Address Added:', res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
      }, err => {
        this.spinner.hide();
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
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
  onSelectChange(value) {
    this.bankName = value;
  }

  editPassword() {
    this.disablePasswordButton = true;
    this.EditForm.get('OldPassword').enable();
    this.EditForm.get('NewPassword').enable();
    this.EditForm.get('ConfirmPassword').enable();
  }

  changeCurrentPassword() {
    this.spinner.show();
    this.editUserService.changePassword({
      'Id': this.userId,
      'OldPassword': this.oldPassword,
      'NewPassword': this.newPassword,
      'ConfirmPassword': this.confirmPassword
    }).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.EditForm.get('OldPassword').disable();
      this.EditForm.get('NewPassword').disable();
      this.EditForm.get('ConfirmPassword').disable();
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.disablePasswordButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      if (err.error.message == 'Incorrect password.') {
        this.showErrorToast('Error!!', 'Incorrect Old Password', 'error');
      } else {
        this.showErrorToast('Error!!', err.error.message, 'error');
      }
    });
  }

}
