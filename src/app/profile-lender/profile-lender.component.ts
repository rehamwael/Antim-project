import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, Color } from 'ng2-charts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { latLng, tileLayer } from 'leaflet';

import { ProfileService } from '../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { EditUserProfile } from './../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../environments/environment';


@Component({
  selector: 'app-profile-lender',
  templateUrl: './profile-lender.component.html',
  styleUrls: ['./profile-lender.component.css']
})
export class ProfileLenderComponent implements OnInit, OnDestroy {
  @ViewChild('one', { static: false }) oneElement: ElementRef;
  @ViewChild('two', { static: false }) twoElement: ElementRef;
  @ViewChild('three', { static: false }) threeElement: ElementRef;
  @ViewChild('four', { static: false }) fourElement: ElementRef;

  userId: any;
  userName: any;
  firstName: any;
  lastName: any;

  currentUser: any;
  userAddress: any;
  userBankInfo: any;

  email: any;
  phone: any;
  countryCode: any;
  NID: any;
  userBalance: any;

  address: any;
  city: any;
  country: any;
  zip: any;
  state: any;
  addressID: any;

  bankName = 'select';
  bankAccountNo: any;
  IBAN: any;
  bankAddress: any;
  accountTitle: any;
  fundingLimit: any;
  bankID: any;

  phoneNumber: any;
  numberEntered = false;
  disableButton = false;
  BankArray: any = [];
  AddressArray: any = [];
  leafletLayers;
  leafletOptions;
  mapCenter;
  zoomLevel;

  disabledButton = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  AddressForm: FormGroup;
  UserBalance: FormGroup;
  disabledBankButton = true;
  disableBalanceButton = false;
  showProfit = false; // hidden by default
  showAddress = false;
  showBank = false;
  showUser = false;
  disableprofileButton = false;
  disableBankButton = false;
  disableAddressButton = false;
  disablePasswordButton = false;
  disableAccountButton = false;

  emailButton = false;
  phoneButton = false;
  showOTPstep = false;
  OTP: any;
  first: number;
  second: number;
  third: number;
  Fourth: number;
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  AccountDocs: any[] = [];
  Accountsfiles: any;
  AccountForm: FormGroup;
  showAccountUploadImg = true;
  NewUploadedAccountDocs: any[] = [];
  showNewAccountUploadImg = false;

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     display: false
  //   },
  //   scales: {
  //     xAxes: [{
  //       barPercentage: 0.2
  //     }], yAxes: [{}]
  //   },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   },
  // };
  // public barChartLabels: Label[] = ['2014', '2016', '2018', '2019', '2020'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56], label: 'Total Fund' },
  //   { data: [28, 48, 40, 19, 86], label: 'Total Profit' }
  // ];
  getState: Observable<any>;
  userLang: any;
  accountStatementId: any;
  deletedAccountFileIndex: any;
  BaseUrl = environment.URLForDownloadFiles;

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public router: Router,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private editUserService: UserEmailPasswordService,
    public translate: TranslateService,

  ) {
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });

    this.getState = this.store.select(selectAuthenticationState);
    this.showUser = true;

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
        Validators.minLength(6),
        Validators.pattern('^[\x20-\x7E]*$')
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


    this.BankInfoForm = fb.group({
      'BankName': [{ value: this.bankName, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        // Validators.minLength(4)
      ])],
      'BankAccountNo': [{ value: this.bankAccountNo, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      // 'AccountTitle': [{ value: this.accountTitle, disabled: this.disabledBankButton }, Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6)
      // ])],
      'IBAN': [{ value: this.accountTitle, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[SA]+[A-Za-z0-9]{25,25}$')
      ])],

      // 'BankAddress': [{ value: this.bankAddress, disabled: this.disabledBankButton }, Validators.compose([
      //   Validators.required,
      //   Validators.minLength(10)
      // ])],
      'FundingLimit': [{ value: this.fundingLimit, disabled: this.disabledBankButton }, Validators.compose([
        Validators.required
      ])]
      // 'investmentPerYear': [{value: this.investment, disabled: this.disabledBankButton}, Validators.compose([
      //   Validators.required
      // ])],
    });
    this.leafletLayers = [tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {})];
    this.mapCenter = latLng(24.8085046, 46.6711241);
    this.zoomLevel = 7;

    this.AddressForm = fb.group({
      'Address': [{ value: this.address, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
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
    this.AccountForm = this.fb.group({
      'AccountStatement': ['']
    });

    // this.UserBalance = fb.group({
    //   'MyBalance':  [{ value: this.UserBalance, disabled: this.disabledButton }, Validators.compose([
    //     Validators.required
    //   ])],
    // });

  }

  getUserINFO() {
    return new Promise((resolve, reject) => {
      this.profileService.getUserData().subscribe(res => {
        this.currentUser = res.result;
        this.NID = res.result.nationalIdNumber;
        this.phone = res.result.phoneNumber;
        this.countryCode = res.result.dialingCode;
        this.email = res.result.email;
        this.firstName = res.result.firstName;
        this.lastName = res.result.lastName;
        this.userName = res.result.userName;
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


  ngOnInit() {
    this.spinner.show();
    this.showUser = true;
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
        this.spinner.show();
        this.profileService.getUserBankInfo().subscribe(res => {
          this.spinner.hide();
          this.userBankInfo = res.result;
          this.bankName = res.result.bankName;
          // this.bankAddress = res.result.address;
          // this.accountTitle = res.result.accountTitle;
          this.bankAccountNo = res.result.accountNumber;
          this.fundingLimit = res.result.fundingLimit;
          this.IBAN = res.result.ibaNnumber;
          this.bankID = res.result.id;
          this.AccountDocs = res.result.accountStatementFiles;
          if (res.result.accountStatementFiles.length > 0) {
            this.showAccountUploadImg = false;
          }
          console.log('userBankInfo:', this.userBankInfo);
        }, err => {
          this.spinner.hide();
          console.log('ERROR:', err);
        });
      }
    });


    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountNo').disable();
    this.BankInfoForm.get('IBAN').disable();
    this.BankInfoForm.get('FundingLimit').disable();
    // this.BankInfoForm.get('investmentPerYear').disable();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.spinner.hide();
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
    this.emailButton = true;
    this.phoneButton = true;
    this.EditForm.get('FirstName').enable();
    this.EditForm.get('LastName').enable();
    this.EditForm.get('UserName').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('NID').enable();
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
    if (this.userLang == 'arabic') {
      if (next == 4) {
        setTimeout(() => {
          this.threeElement.nativeElement.focus();
        }, 0);
      } else if (next == 3) {
        setTimeout(() => {
          this.twoElement.nativeElement.focus();
        }, 0);
      } else if (next == 2) {
        setTimeout(() => {
          this.oneElement.nativeElement.focus();
        }, 0);
      }
    } else {
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
    this.BankInfoForm.get('IBAN').enable();
    this.BankInfoForm.get('FundingLimit').enable();

    // this.BankInfoForm.get('investmentPerYear').enable();
  }
  SaveBankInfo() {
    if (this.BankArray.length > 0) {
      this.spinner.show();
      this.profileService.editUserBankInfo({
        'id': this.bankID,
        'BankName': this.bankName,
        // 'Address': this.bankAddress,
        // 'AccountTitle': this.accountTitle,
        'AccountNumber': this.bankAccountNo,
        'IBANnumber': this.IBAN,
        'FundingLimit': this.fundingLimit
      }).subscribe((res) => {
        console.log('Bank Info edited:', res);
        this.spinner.hide();
        this.profileService.showSuccessToastr(res);
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        // this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('IBAN').disable();
        this.BankInfoForm.get('FundingLimit').disable();
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
        // 'Address': this.bankAddress,
        // 'AccountTitle': this.accountTitle,
        'AccountNumber': this.bankAccountNo,
        'IBANnumber': this.IBAN,
        'FundingLimit': this.fundingLimit
      }).subscribe((res) => {
        console.log('BANK  Added:', res);
        this.spinner.hide();
        this.BankArray[0] = res.result;
        this.bankID = res.result.id;
        this.profileService.showSuccessToastr(res);
        this.BankInfoForm.get('BankName').disable();
        this.BankInfoForm.get('BankAccountNo').disable();
        // this.BankInfoForm.get('AccountTitle').disable();
        this.BankInfoForm.get('IBAN').disable();
        this.BankInfoForm.get('FundingLimit').disable();
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
        console.log('Address info edited:', res);
        this.spinner.hide();
        this.profileService.showSuccessToastr(res);
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
      }, err => {
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
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
        this.AddressArray[0] = res.result;
        this.addressID = res.result.id;
        this.profileService.showSuccessToastr(res);
        this.AddressForm.get('Address').disable();
        this.AddressForm.get('City').disable();
        this.AddressForm.get('Country').disable();
        this.AddressForm.get('State').disable();
        this.AddressForm.get('Zip').disable();
        this.disableAddressButton = false;
      }, err => {
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
      });
    }
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
  SelectBank(value) {
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
      this.disablePasswordButton = false;
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
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
    if (event.target.files) {
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
      formData.append('ACCOUNTfile.no.' + (i + 1), this.NewUploadedAccountDocs[i]);
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

  closeNewAccountDetails(i: number) {
    this.NewUploadedAccountDocs.splice(i, 1);
    if (this.NewUploadedAccountDocs.length == 0) {
      this.showNewAccountUploadImg = false;
      this.disableAccountButton = false;
    }
  }
  downloadFile(fileName: any) {
    return new Promise((resolve, reject) => {
      window.open(this.BaseUrl + fileName, '_blank');
      resolve();
    });
  }

  openDeleteFilePopUp(i, content, id) {
    this.deletedAccountFileIndex = i;
    this.accountStatementId = id;
    this.modalService.open(content, { centered: false });
  }
  DownloadAccountFile(fileName: any) {
    this.spinner.show();
    this.downloadFile(fileName).then(e => {
      this.spinner.hide();
    });
  }
  deleteFile() {
    this.spinner.show();
    this.profileService.deleteBankStatement(this.accountStatementId).subscribe(res => {
      this.modalService.dismissAll();
      this.spinner.hide();
      this.profileService.showSuccessToastr(res);
      this.AccountDocs.splice(this.deletedAccountFileIndex, 1);
      if (this.AccountDocs.length == 0) {
        this.showAccountUploadImg = true;
        this.disableAccountButton = false;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  // tslint:disable-next-line: member-ordering
  public barChartColors: Color[] = [
    { backgroundColor: '#39A4E9' },
    { backgroundColor: '#5C20D2' },
  ];
}
