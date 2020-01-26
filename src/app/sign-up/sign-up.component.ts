import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.states';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit , OnDestroy {
  @ViewChild('two', {static: false}) twoElement: ElementRef;
  @ViewChild('three', {static: false}) threeElement: ElementRef;
  @ViewChild('four', {static: false}) fourElement: ElementRef;

  chooseRole = true;
  firstStep = false;
  secondStep = false;
  // lastStep = false;

  public selectedItem: any;
  disabledNextButton = true;
  disabledSubmitButton = true;
  SigUpForm: FormGroup;
  userType = '';
  dashboredUrl: any;
  public id: number;
  signupFirstName: any;
  signupLastName: any;
  signupUserName: any;
  signupEmail: any;
  signupPassword: any;
  signupCPassword: any;
  signupIdNum: any;
  signupPhone: number;
  signupCountrycode = '+966';
  first: number;
  second: number;
  third: number;
  Fourth: number;
  phoneNumber: string;
  numberEntered = false;
  OTP = '';
  disabledAgreement1 = false;
  disabledAgreement2 = false;
  isButtonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private profileService: ProfileService,
    ) {


    this.SigUpForm = fb.group({
      'FirstName': [null, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [null, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'NID': [null, Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'password': [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
         ]
      ],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
      ])],
      'countrycode': [''],
      'phone': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
      'One': [''],
      'Two': [''],
      'Three': [''],
      'Four': ['']
    });

  }

  ngOnInit(): void {
    this.clear();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }

  changeCheck1(event) {
    if (event.target.checked) {
      this.disabledAgreement1 = true;
    } else {
      this.disabledAgreement1 = false;
      this.isButtonDisabled = false;
    }
    if (this.disabledAgreement1 && this.disabledAgreement2) {
      this.isButtonDisabled = true;
    }
  }
  changeCheck2(event) {
    if (event.target.checked) {
      this.disabledAgreement2 = true;
    } else {
      this.disabledAgreement2 = false;
      this.isButtonDisabled = false;
    }
    if (this.disabledAgreement1 && this.disabledAgreement2) {
      this.isButtonDisabled = true;
    }
  }
  inputNumber(event) {
    this.phoneNumber = event.target.value;
    if (this.phoneNumber.length >= 9) {
    this.numberEntered = true;
    } else {
      this.numberEntered = false;
    }
  }

  addClass(ID: any) {
    this.id = ID;
    if (this.id === 1) {
      this.userType = 'funder';
    } if (this.id === 2) {
      this.userType = 'customer';
    }
    this.dashboredUrl = 'dashbored-' + this.userType;
    if (this.disabledNextButton) {
      this.disabledNextButton = false;
    }
  }
  Nextstep() {
    this.spinner.hide();
    this.firstStep = true;
    this.chooseRole = false;
    console.log(this.userType);
  }
  PrevStep() {
    this.chooseRole = true;
    this.firstStep = false;
    this.userType = '';
    this.clear();
  }
  thirdStep() {
    if (this.signupCPassword !== this.signupPassword) {
      this.profileService.showErrorToastr('Password Must Match | كلمة المرور يجب ان تتطابق');
    } else {
      this.spinner.show();
      this.authservice.register({
        'Email': this.signupEmail,
        'FirstName': this.signupFirstName,
        'LastName': this.signupLastName,
        'NationalIdNumber': this.signupIdNum,
        'UserName': this.signupUserName,
        'Password': this.signupPassword,
        'ConfirmPassword': this.signupCPassword,
        'PhoneNumber': this.signupPhone,
        'DialingCode': this.signupCountrycode,
        'Role': this.userType
        }).subscribe(res => {
            this.spinner.hide();
            this.secondStep = true;
            this.firstStep = false;
            this.chooseRole = false;
            this.profileService.showSuccessToastr(res);
            console.log('next OTP step: ', res);
        }, err => {
          this.spinner.hide();
          console.log(err);
            if (err.error.message) {
              this.profileService.showErrorToastr(err.error.message);
            }
        });
    }
  }

  goToLastStep() {
    this.spinner.show();
    this.isButtonDisabled = false;
    this.disabledAgreement1 = false;
    this.disabledAgreement2 = false;
    this.OTP = '' + this.first + this.second + this.third + this.Fourth;
    this.authservice.registerWithOTP({
      'Email': this.signupEmail,
      'FirstName': this.signupFirstName,
      'LastName': this.signupLastName,
      'NationalIdNumber': this.signupIdNum,
      'UserName': this.signupUserName,
      'Password': this.signupPassword,
      'ConfirmPassword': this.signupCPassword,
      'PhoneNumber': this.signupPhone,
      'DialingCode': this.signupCountrycode,
      'Role': this.userType,
      'VerificationCode': this.OTP
      }).subscribe( (res) => {
        this.spinner.hide();
        console.log('signUp : ', res);
        this.secondStep = false;
        // this.lastStep = true;
        this.router.navigateByUrl('/login');
        let result: any = {
          message: 'Account Created Successfully! A verification link has been sent to your email account. Please verify your email to get the most benefits from ANTIM',
          arabicMessage: ' تم إنشاء الحساب بنجاح! تم إرسال رابط التحقق إلى حساب البريد الإلكتروني الخاص بك. يرجى التحقق من بريدك الإلكتروني للحصول على أكبر قدر من الفوائد من انتيم'
        };
        this.profileService.showSuccessToastr(result);
      }, err => {
        this.spinner.hide();
        console.log('Errrrrror : ', err);
        this.profileService.showErrorToastr(err.error.message);
      });
  }
  closeBack() {
    this.clear();
    this.userType = '';
    this.chooseRole = true;
    this.firstStep = false;
    this.secondStep = false;
    console.log(this.userType);
  }
  closeBackLast() {
    this.clear();
    this.userType = '';
    this.chooseRole = true;
    this.firstStep = false;
    this.secondStep = false;
    // this.lastStep = false;
  }
  resendOTP() {
    this.spinner.show();
    this.authservice.ResendOtp({
      'Email': this.signupEmail,
      'FirstName': this.signupFirstName,
      'LastName': this.signupLastName,
      'NationalIdNumber': this.signupIdNum,
      'UserName': this.signupUserName,
      'Password': this.signupPassword,
      'ConfirmPassword': this.signupCPassword,
      'PhoneNumber': this.signupPhone,
      'DialingCode': this.signupCountrycode,
      'Role': this.userType
      }).subscribe( (res) => {
        console.log('code resend:', res);
        this.profileService.showSuccessToastr(res);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.profileService.showErrorToastr(err.error.message);
        console.log('Errrrrror : ', err);
      });
  }

  // signUp() {
  //   this.router.navigateByUrl('/login');
  //   this.showSuccessToast('OK!!', 'Your Account Created Successfully!!', 'success');
  // }

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
   clear() {
    this.SigUpForm.reset();
    this.signupFirstName = '';
    this.signupLastName = '';
    this.signupUserName = '';
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupCPassword = '';
    this.signupIdNum = '';
    this.signupPhone = null;
    this.signupCountrycode = '+966';
    this.first = null;
    this.second = null;
    this.third = null;
    this.Fourth = null;
   }
   next() {
     this.secondStep = true;
     this.firstStep = false;
   }

}
