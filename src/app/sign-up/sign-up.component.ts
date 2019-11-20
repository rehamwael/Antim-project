import { Component, OnInit , OnDestroy, HostListener, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  signupName: any;
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
  isSignupButtonDisabled = false;

  changeCheck1(event) {
    if (event.target.checked) {
      this.disabledAgreement1 = true;
    } else {
      this.disabledAgreement1 = false;
      this.isSignupButtonDisabled = false;
    }
    if (this.disabledAgreement1 && this.disabledAgreement2) {
      this.isSignupButtonDisabled = true;
    }
  }
  changeCheck2(event) {
    if (event.target.checked) {
      this.disabledAgreement2 = true;
    } else {
      this.disabledAgreement2 = false;
      this.isSignupButtonDisabled = false;
    }
    if (this.disabledAgreement1 && this.disabledAgreement2) {
      this.isSignupButtonDisabled = true;
    }
  }

  @HostListener('input') oninput() {
    if (this.SigUpForm.valid) {
      this.disabledSubmitButton = false;
      }
  }

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
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
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
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
inputNumber(event) {
  this.phoneNumber = event.target.value;
  if (this.phoneNumber.length > 9) {
  this.numberEntered = true;
  } else {
    this.numberEntered = false;
  }
}

  ngOnInit(): void {
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
      this.userType = 'lender';
    } if (this.id === 2) {
      this.userType = 'borrower';
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
      this.sheckMobileStep = !this.sheckMobileStep;
    }
  }
  goToLastStep() {
    this.lastStep = !this.lastStep;
    this.OTP = '' + this.first + this.second + this.third + this.Fourth;
    console.log('OTP', this.OTP);
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
    // const element = event.srcElement.nextElementSibling; // get the sibling element

    // if (element == null) {  // check if its null
    //     return;
    // } else {
    //     element.focus();
    // }
   }
   clear() {
    this.SigUpForm.reset();
    this.signupName = '';
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
