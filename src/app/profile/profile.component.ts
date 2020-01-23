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
  bankName = 'select';
  bankAccountNo: any;
  bankAddress: any;
  accountTitle: any;
  AccountDocs: any[] = [];
  SalaryDocs: any[] = [];
  NewUploadedAccountDocs: any[] = [];
  NewUploadedSalaryDocs: any[] = [];
  Accountsfiles: any;
  Salaryfiles: any;

  showAccountUploadImg = true;
  showSalaryUploadImg = true;

  disabledButton = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  AddressForm: FormGroup;
  AccountForm: FormGroup;
  SalaryForm: FormGroup;
  disabledBankButton = true;
  zoom: number;
  center: L.LatLng;
  fitBounds: L.LatLngBounds;
  baseLayers: L.TileLayer[];
  leafletLayers;
  leafletOptions;
  mapCenter;
  zoomLevel;
  phoneNumber: any;
  numberEntered = false;
  disableprofileButton = false;
  emailButton = false;
  phoneButton = false;
  disableBankButton = false;
  disableAddressButton = false;
  disablePasswordButton = false;
  disableAccountButton = false;
  disableSalaryButton = false;
  showAddress = false;
  showBank = false;
  showUser = false;
  BankArray: any = [];
  AddressArray: any = [];
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
  showNewAccountUploadImg = false;
  showNewSalaryUploadImg = false;

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    public router: Router,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private editUserService: UserEmailPasswordService,
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.EditForm = fb.group({
      'FirstName': [{ value: this.firstName, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [{ value: this.lastName, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'UserName': [{ value: this.userName, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.minLength(6)
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
    this.AccountForm = this.fb.group({
      'AccountStatement': ['']
    });
    this.SalaryForm = this.fb.group({
      'SalaryStatement': ['']
    });
    this.leafletLayers = [tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {})];
    this.mapCenter = latLng(24.8085046, 46.6711241);
    this.zoomLevel = 7;
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
    this.NewUploadedAccountDocs.length = 0;
    this.NewUploadedSalaryDocs.length = 0;
    this.showUser = true;
    this.spinner.show();
    this.getUserINFO().then(e => {
      this.spinner.hide();
      if (this.AddressArray.length > 0) {
        // this.spinner.show();
        this.profileService.getUserAddress().subscribe(res => {
          this.userAddress = res.result;
          this.address = res.result.address;
          this.city = res.result.city;
          this.country = res.result.country;
          this.zip = res.result.postalCode;
          this.state = res.result.state;
          this.addressID = res.result.id;
          console.log('userAddressINFO:', res.result);
          // this.spinner.hide();
        }, err => {
          // this.spinner.hide();
          console.log('ERROR:', err);
        });
      }
      if (this.BankArray.length > 0) {
        // this.spinner.show();
        this.profileService.getUserBankInfo().subscribe(res => {
          this.userBankInfo = res.result;
          this.bankName = res.result.bankName;
          this.bankAddress = res.result.address;
          this.accountTitle = res.result.accountTitle;
          this.bankAccountNo = res.result.accountNumber;
          this.AccountDocs = res.result.accountStatementFiles;
          if (res.result.accountStatementFiles.length > 0) {
            this.showAccountUploadImg = false;
          }
          console.log('AccountDocs: ', this.AccountDocs);
          this.SalaryDocs = res.result.salaryStatementFiles;
          if (res.result.salaryStatementFiles.length > 0) {
            this.showSalaryUploadImg = false;
          }
          this.bankID = res.result.id;
          console.log('userBankInfo:', this.userBankInfo);
          // this.spinner.hide();
        }, err => {
          // this.spinner.hide();
          console.log('ERROR:', err);
        });
      }
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
      this.profileService.showErrorToastr('Please Enter Email | الرجاء إدخال عنوان البريد الإلكتروني');
    } else {
      this.spinner.show();
      this.editUserService.editUserEmail({
        'Id': this.userId,
        'NewEmail': this.email,
        'UserName': this.userName
      }).subscribe(res => {
        console.log(res);
        this.spinner.hide();
        this.profileService.showSuccessToastr(res);
        this.emailButton = false;
        this.EditForm.get('Email').disable();
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.profileService.showErrorToastr(err.error.message);
      });
    }
  }

  editMobileNo() {
    if (this.phone == '' || this.countryCode == null) {
      this.profileService.showErrorToastr('Please Enter Proper Mobile Number | الرجاء إدخال رقم الجوال الصحيح');
    } else {
      this.spinner.show();
      this.profileService.editUserPhoneNumber({
        'Id': this.userId,
        'PhoneNumber': this.phone,
        'DialingCode': this.countryCode
      }).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        this.profileService.showSuccessToastr(res);
        this.phoneButton = false;
        this.showOTPstep = true;
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
        this.profileService.showErrorToastr(err.error.message);
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
      this.profileService.showSuccessToastr(res);
      this.showOTPstep = false;
      this.EditForm.get('MobileNo').disable();
      this.EditForm.get('CountryCode').disable();
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.profileService.showErrorToastr(err.error.message);
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
      this.profileService.showSuccessToastr(res);
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }

  SaveInfo() {
    let actionPayload = {
      'FirstName': this.firstName,
      'LastName': this.lastName,
      'UserName': this.userName,
      'NationalIdNumber': this.NID,
      // 'PhoneNumber': this.phone.toString(),
      // 'Email': this.email
    };
    this.store.dispatch(new EditUserProfile(actionPayload));
    // this.EditForm.get('FirstName').disable();
    // this.EditForm.get('LastName').disable();
    // this.EditForm.get('UserName').disable();
    // this.EditForm.get('NID').disable();
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
        this.profileService.showSuccessToastr(res);
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('BankAddress').disable();
        this.disableBankButton = false;
      }, err => {
        console.log('ERROR', err);
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
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
        this.BankArray[0] = res.result;
        this.bankID = res.result.id;
        this.spinner.hide();
        this.profileService.showSuccessToastr(res);
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('BankAddress').disable();
        this.disableBankButton = false;
      }, err => {
        console.log('ERROR', err);
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
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
        this.spinner.hide();
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
        this.profileService.showSuccessToastr(res);
      }, err => {
        this.profileService.showErrorToastr(err.error.message);
        this.spinner.hide();
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
        this.AddressArray[0] = res.result;
        this.addressID = res.result.id;
        this.spinner.hide();
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
        this.profileService.showSuccessToastr(res);
      }, err => {
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
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
      this.profileService.showSuccessToastr(res);
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
        this.profileService.showErrorToastr('Incorrect Old Password | كلمة السر القديمة غير صحيحة');
      } else {
        this.profileService.showErrorToastr(err.error.message);
      }
    });
  }

  uploadAccoutFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.Accountsfiles = event.target.files.length;
      for (let i = 0; i < this.Accountsfiles; i++) {
        this.NewUploadedAccountDocs.push(event.target.files[i]);
      }
    }
    console.log(this.NewUploadedAccountDocs);
    this.disableAccountButton = true;
    this.showNewAccountUploadImg = true;
  }
  onAccountFormSubmit() {
    let formData = new FormData();
    for (let i = 0; i < this.Accountsfiles; i++) {
      formData.append('file-' + i, this.NewUploadedAccountDocs[i]);
    }
    this.spinner.show();
    this.profileService.uploadAccountStatement(formData).subscribe(res => {
      this.spinner.hide();
      console.log('result:', res);
      this.profileService.showSuccessToastr(res);
      this.disableAccountButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }
  closeAccountDetails(i: number) {
    this.AccountDocs.splice(i, 1);
    if (this.AccountDocs.length == 0) {
      this.showAccountUploadImg = true;
      this.disableAccountButton = false;
    }
  }
  closeNewAccountDetails(i: number) {
    this.NewUploadedAccountDocs.splice(i, 1);
    if (this.NewUploadedAccountDocs.length == 0) {
      this.showNewAccountUploadImg = false;
      this.disableAccountButton = false;
    }
  }

  uploadSalaryFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.Salaryfiles = event.target.files.length;
      for (let i = 0; i < this.Salaryfiles; i++) {
        this.NewUploadedSalaryDocs.push(event.target.files[i]);
      }
    }
    console.log(this.NewUploadedSalaryDocs);
    this.disableSalaryButton = true;
    this.showNewSalaryUploadImg = true;
  }
  onSalaryFormsubmit() {
    let formData = new FormData();
    for (let i = 0; i < this.Salaryfiles; i++) {
      formData.append('file-' + i, this.NewUploadedSalaryDocs[i]);
    }
    this.spinner.show();
    this.profileService.uploadSalaryStatement(formData).subscribe(res => {
      this.spinner.hide();
      console.log('result:', res);
      this.profileService.showSuccessToastr(res);
      this.disableSalaryButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.profileService.showErrorToastr(err.error.message);
    });

  }
  closeSalaryDetails(i: number) {
    this.SalaryDocs.splice(i, 1);
    if (this.SalaryDocs.length == 0) {
      this.showSalaryUploadImg = true;
      this.disableSalaryButton = false;
    }
  }
  closeNewSalaryDetails(i: number) {
    this.NewUploadedSalaryDocs.splice(i, 1);
    if (this.NewUploadedSalaryDocs.length == 0) {
      this.showNewSalaryUploadImg = false;
      this.disableSalaryButton = false;
    }
  }

}
