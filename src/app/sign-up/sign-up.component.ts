import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.states';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

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
  lastStep = false;

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
  signupPhone: any;
  signupCountrycode: any;
  first: number;
  second: number;
  third: number;
  Fourth: number;
  phoneNumber: string;
  numberEntered = false;
  OTP = '';
  options: IndividualConfig;
  option: IndividualConfig;
  disabledAgreement1 = false;
  disabledAgreement2 = false;
  isButtonDisabled = false;
  // submitted = false;
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.SigUpForm.invalid) {
  //       return;
  //   }
  // }
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

  // @HostListener('input') oninput() {
  //   if (this.SigUpForm.valid) {
  //     this.disabledSubmitButton = false;
  //     }
  // }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-bottom-right';
    this.options.timeOut = 5000;
    this.option = this.toastr.toastrConfig;
    this.option.positionClass = 'toast-top-right';
    this.option.timeOut = 5000;

    this.SigUpForm = fb.group({
      'FirstName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
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
      'countrycode': [null, Validators.compose([
        Validators.required
      ])],
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
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.option, 'toast-' + type);
}
showErrorToast(title, message, type) {
  this.toastr.show(message, title, this.options, 'toast-' + type);
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
    this.firstStep = true;
    this.chooseRole = false;
  }
  PrevStep() {
    this.chooseRole = true;
    this.firstStep = false;
    this.userType = '';
    this.clear();
  }
  thirdStep() {
    if (this.signupCPassword !== this.signupPassword) {
      this.showErrorToast('Error!!', 'Password Must Match', 'error');
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
        'PhoneNumber': this.signupPhone.toString(),
        'DialingCode': this.signupCountrycode.toString(),
        'Role': this.userType
        }).subscribe(  async (res) => {
            this.spinner.hide();
            this.secondStep = true;
            this.firstStep = false;
            this.chooseRole = false;
            console.log('next OTP step: ', res);
        }, err => {
          this.spinner.hide();
            if (err.error.message) {
              this.showErrorToast('Error!!', err.error.message, 'error');
            }
        });
    }
  }
  // keyDownFunction(event) {
  //   this.chooseRole = false;
  //   console.log(event.key);
  //   if (event.key == 'Enter') {
  //     // alert('Please click to SignUp Button to Submit Form.');
  //     this.chooseRole = false;
  //   }
  // }

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
      'PhoneNumber': this.signupPhone.toString(),
      'DialingCode': this.signupCountrycode.toString(),
      'Role': this.userType,
      'VerificationCode': this.OTP
      }).subscribe( (res) => {
        this.spinner.hide();
        console.log('signUp : ', res);
        this.secondStep = false;
        this.lastStep = true;
        this.showSuccessToast('OK!!', 'A verification link has been sent to your email account.', 'success');
      }, async err => {
        this.spinner.hide();
        console.log('Errrrrror : ', err);
      });
  }
  closeBack() {
    this.clear();
    this.userType = '';
    this.chooseRole = true;
    this.firstStep = false;
    this.secondStep = false;
  }
  closeBackLast() {
    this.clear();
    this.userType = '';
    this.chooseRole = true;
    this.firstStep = false;
    this.secondStep = false;
    this.lastStep = false;
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
      'PhoneNumber': this.signupPhone.toString(),
      'DialingCode': this.signupCountrycode.toString(),
      'Role': this.userType
      }).subscribe( (res) => {
        console.log('code resend:', res);
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
          console.log('Errrrrror : ', err);
      });
  }

  signUp() {
    this.router.navigateByUrl('/login');
    this.showSuccessToast('OK!!', 'Your Account Created Successfully!!Please Confirm your Email and then Login to get access.', 'success');
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
   clear() {
    this.SigUpForm.reset();
    this.signupFirstName = '';
    this.signupLastName = '';
    this.signupUserName = '';
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupCPassword = '';
    this.signupIdNum = '';
    this.signupPhone = '';
    this.signupCountrycode = '';
    this.first = null;
    this.second = null;
    this.third = null;
    this.Fourth = null;
   }

}
