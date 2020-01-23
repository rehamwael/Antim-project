import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticationState } from './../store/app.states';

import { Login } from './../store/actions/auth.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  getState: Observable<any>;
  errorMessage: string = null;
  content: any;

  LoginForm: FormGroup;
  disabledSubmitButton = true;
  IsAccountDeActivated: boolean;
  loginUsername: any;
  loginPassword: any;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
    }
  }
  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.LoginForm = fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        // Validators.minLength(4)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
    });
  }

  ngOnInit(): void {
    this.spinner.hide();
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
    this.getState.subscribe((state) => {
      // console.log('state:', state);
      this.IsAccountDeActivated = state.accountDeActivate;
      if (this.IsAccountDeActivated == true) {
        this.modalService.open(this.content, { centered: false });
      }
    });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  login(Content) {
    this.content = Content;
    let actionPayload = {
      username: this.loginUsername,
      password: this.loginPassword
    };
    this.store.dispatch(new Login(actionPayload));
  }

  sendRequestToAdmin() {
    this.spinner.show();
    this.profileService.accountReactivateRequest(this.loginUsername).subscribe(res => {
      this.spinner.hide();
      console.log('result:', res);
      this.modalService.dismissAll();
      this.profileService.showSuccessToastr(res);
    }, err => {
      this.spinner.hide();
      console.log('error:', err);
      this.profileService.showErrorToastr(err.error.message);
    });

  }
}
