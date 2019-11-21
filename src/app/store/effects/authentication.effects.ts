import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

import { AuthService } from './../../auth/auth.service';
import {
  AuthenticationActionTypes,
  Login, LoginSuccess, LoginFailure, Logout
} from '../actions/auth.actions';


@Injectable()
export class AuthenticationEffects {
  options: IndividualConfig;
  userRole: string;

  constructor(
    private actions: Actions,
    private authenticationService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;
    this.options.progressBar = true;
  }

@Effect()
  Login: Observable<any> = this.actions
    .pipe(
      ofType(AuthenticationActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
        return this.authenticationService.login(payload)
        .pipe(
          map((user) => {
            console.log('user', user);
            console.log('role', user.data.user.role);
            this.userRole = user.data.user.role;
            return new LoginSuccess({token: user.token, role: user.data.user.role});
          }),
          catchError((error) => {
            return of(new LoginFailure({ error: error }));
          }));
    }));


  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('role', user.payload.role);
      this.router.navigateByUrl('/dashbored-' + this.userRole);
    })
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.showToast('Error!!',
      'The email address and password that you\'ve entered doesn\'t match any account. Please try again.',
      'error'
      );
    })
  );

  @Effect({ dispatch: false })
  public Logout: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigateByUrl('/login');
    })
  );
  showToast(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}
}
