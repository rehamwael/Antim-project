import { Component, OnInit , OnDestroy, HostListener, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { Login } from './../store/actions/auth.actions';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit , OnDestroy {
  @ViewChild('two', {static: false}) twoElement: ElementRef;
  @ViewChild('three', {static: false}) threeElement: ElementRef;
  @ViewChild('four', {static: false}) fourElement: ElementRef;

  public selectedItem: any;
  disabledNextButton = true;
  showSelected: boolean;
  sheckMobileStep: boolean;
  lastStep: boolean;
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
  first: string;
  second: string;
  third: string;
  Fourth: string;
  phoneNumber: string;
  numberEntered = false;
  OTP = '';
  options: IndividualConfig;
  disabledAgreement1 = false;
  disabledAgreement2 = false;
  isButtonDisabled = false;

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

  @HostListener('input') oninput() {
    if (this.SigUpForm.valid) {
      this.disabledSubmitButton = false;
      }
  }

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authservice: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-bottom-right';
    this.options.timeOut = 3000;

    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep = false;

    this.SigUpForm = fb.group({
      'FirstName': [null, Validators.compose([
        Validators.required
      ])],
      'LastName': [null, Validators.compose([
        Validators.required
      ])],
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'NID': [null, Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.pattern('(?=^.{9,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ])],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
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
  showToast(title, message, type) {
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
      this.userType = 'Funder';
    } if (this.id === 2) {
      this.userType = 'Customer';
    }
    this.dashboredUrl = 'dashbored-' + this.userType;
    if (this.disabledNextButton) {
      this.disabledNextButton = false;
    }
  }
  Nextstep() {
    this.showSelected = !this.showSelected;
  }
  PrevStep() {
    this.userType = '';
    this.clear();
    this.showSelected = !this.showSelected;

  }
  thirdStep() {
    if (this.signupCPassword !== this.signupPassword) {
      this.showToast('Error!!', 'Password Must Match', 'error');
    } else {
      this.authservice.register({
        'Email': this.signupEmail,
        'FirstName': this.signupFirstName,
        'LastName': this.signupLastName,
        'NationalIdNumber': this.signupIdNum,
        'UserName': this.signupUserName,
        'Password': this.signupPassword,
        'ConfirmPassword': this.signupCPassword,
        'PhoneNumber': this.signupPhone.toString(),
        'DialingCode': '+92',
        'Role': this.userType
        }).subscribe( (res) => {
              console.log('next OTP step');
              this.sheckMobileStep = !this.sheckMobileStep;
        }, err => {
            console.log('Errrrrror : ', err);
        });
    }
  }
  goToLastStep() {
    this.isButtonDisabled = false;
    this.disabledAgreement1 = false;
    this.disabledAgreement2 = false;
    this.OTP = '' + this.first + this.second + this.third + this.Fourth;
    console.log('OTP', this.OTP);
    this.authservice.registerWithOTP({
      'Email': this.signupEmail,
      'FirstName': this.signupFirstName,
      'LastName': this.signupLastName,
      'NationalIdNumber': this.signupIdNum,
      'UserName': this.signupUserName,
      'Password': this.signupPassword,
      'ConfirmPassword': this.signupCPassword,
      'PhoneNumber': this.signupPhone.toString(),
      'DialingCode': '+92',
      'Role': this.userType,
      'VerificationCode': this.OTP
      }).subscribe( (res) => {
            console.log('signUp!', res);
            this.lastStep = !this.lastStep;
          }, async err => {
          console.log('Errrrrror : ', err);
      });
  }
  closeBack() {
    this.clear();
    this.userType = '';
    this.showSelected = false;
    this.sheckMobileStep = false;
  }
  closeBackLast() {
    this.clear();
    this.userType = '';
    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep = false;
  }
  signUp() {
    this.router.navigateByUrl('/login');
    this.showToast('OK!!', 'Your Account Created Successfully!!Please Login to get access.', 'success');
  }

  /* keytab(event, next) {
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

    // const element = event.srcElement.nextElementSibling; // get the sibling element

    // if (element == null) {  // check if its null
    //     return;
    // } else {
    //     element.focus();
    // }
   }*/
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
    this.first = '';
    this.second = '';
    this.third = '';
    this.Fourth = '';
   }

}
