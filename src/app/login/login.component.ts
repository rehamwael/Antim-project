import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { Login } from './../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit , OnDestroy {

  getState: Observable<any>;
  errorMessage: string = null;

  LoginForm: FormGroup;
  disabledSubmitButton = true;
  loginUsername: any;
  loginPassword: any;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) {
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
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
    this.getState.subscribe((state) => {
      // this.errorMessage = state.errorMessage;
    });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  login() {
    const actionPayload = {
      username: this.loginUsername,
      password: this.loginPassword
    };
    this.store.dispatch(new Login(actionPayload));
  }
}
