import { Component, OnInit , OnDestroy, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit , OnDestroy {
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
  options: IndividualConfig;

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
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])],
      'phone': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.pattern('(?=^.{9,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')
      ])],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
      ])]
    });

  }
  showToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
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
    this.SigUpForm.reset();
    this.showSelected = !this.showSelected;

  }
  thirdStep() {
    if (this.signupCPassword !== this.signupPassword) {
      this.showToast('Error!!', 'Password Must Match', 'error');
    } else {
      this.sheckMobileStep = !this.sheckMobileStep;
    }
  }
  lastStepd() {
    this.lastStep = !this.lastStep;
  }
  closeBack() {
    this.userType = '';
    this.showSelected = false;
    this.sheckMobileStep = false;
  }
  closeBackLast() {
    this.userType = '';
    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep = false;
  }
  keytab(event: { srcElement: { nextElementSibling: any; }; }) {
    const element = event.srcElement.nextElementSibling; // get the sibling element

    if (element == null) {  // check if its null
        return;
    } else {
        element.focus();
    }   // focus if not null
   }

}
