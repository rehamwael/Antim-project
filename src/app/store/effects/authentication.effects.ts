import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../../services/userProfile.service';
import { Store } from '@ngrx/store';

import { AuthService } from './../../auth/auth.service';
import {
  AuthenticationActionTypes,
  Login, LoginSuccess, LoginFailure, Logout, UserProfile, SaveUserProfile
} from '../actions/auth.actions';
import { AppState } from '../app.states';
import { CustomerRequestService } from 'src/app/services/customer-request.service';
import {
  CustomerActionTypes, SaveAllCustomerRequests, EditCustomerRequest, DeleteCustomerRequests, DeleteRequestSuccess
} from '../actions/customer.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class AuthenticationEffects {
  options: IndividualConfig;
  userRole: string;

  constructor(private modalService: NgbModal,
    private actions: Actions,
    private authenticationService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userDataService: ProfileService,
    private store: Store<AppState>,
    private customerService: CustomerRequestService,
    private spinner: NgxSpinnerService) {
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
        this.spinner.show();
        return this.authenticationService.login(payload)
          .pipe(
            map((user) => {
              this.spinner.hide();
              console.log('in ngrx effects :', user);
              const decoded = jwt_decode(user.access_token);
              this.userRole = decoded.role;
              return new LoginSuccess({ token: user.access_token, role: decoded.role });
            }),
            catchError((error) => {
              this.spinner.hide();
              return of(new LoginFailure({ error: error.error }));
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
    tap((res) => {
      if (res.payload.error.error_description) {
        this.showToast('Error!!', res.payload.error.error_description, 'error');
      } else {
        this.showToast('Error!!',
          'The email address and password that you\'ve entered doesn\'t match any account. Please try again.',
          'error'
        );
      }
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
  @Effect({ dispatch: false })
  UserProfile: Observable<any> = this.actions
    .pipe(
      ofType(AuthenticationActionTypes.USER_PROFILE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getUserData().subscribe(res => {
          this.store.dispatch(new SaveUserProfile(res.result));
          this.spinner.hide();
        });
      }));

  @Effect({ dispatch: false })
  GetAllCustomerRequests: Observable<any> = this.actions.pipe(
    ofType(CustomerActionTypes.GET_ALL_REQUESTS),
    tap(() => {
      this.spinner.show();
      return this.customerService.customerAllRequests().subscribe(res => {
        this.store.dispatch(new SaveAllCustomerRequests(res.result));
        this.spinner.hide();
      });
    }));

    // @Effect({ dispatch: false })
    // AddCustomerRequests: Observable<any> = this.actions.pipe(
    //   ofType(CustomerActionTypes.ADD_REQUEST),
    //   tap(() => {
    //     this.spinner.show();
    //     return this.customerService.customerAllRequests().subscribe(res => {
    //       this.store.dispatch(new SaveAllCustomerRequests(res.result));
    //       this.spinner.hide();
    //     });
    //   }));

    @Effect({ dispatch: false })
    EditCustomerRequests: Observable<any> = this.actions.pipe(
      // ofType(CustomerActionTypes.EDIT_REQUEST),
      // tap(() => {
      //   this.spinner.show();
      //   return this.customerService.EditCustomerRequest().subscribe(res => {
      //     this.store.dispatch(new SaveAllCustomerRequests(res.result));
      //     this.spinner.hide();
      //   });
      // }));
      ofType(CustomerActionTypes.EDIT_REQUEST),
      map((action: EditCustomerRequest) => action.payload),
      switchMap(payload => {
        this.spinner.show();
        return this.customerService.EditCustomerRequest(payload).pipe(
          map((res) => {
          console.log(' Edited:', res);
          this.spinner.hide();
          this.showSuccessToast('OK!!', res.message, 'success');
          // this.modalService.open(content3, { centered: true });
        }),
        catchError( error => {
          console.log(' ERROR:', error);
          this.spinner.hide();
          return of(this.showErrorToast('Error!!', error.error.message, 'error'));
        }));
      }));

      @Effect({ dispatch: false })
      DeleteCustomerRequest: Observable<any> = this.actions.pipe(
        ofType(CustomerActionTypes.DELETE_REQUEST),
        map((action: DeleteCustomerRequests) => action.payload),
        switchMap(payload => {
          this.spinner.show();
          return this.customerService.deleteCustomerRequest(payload.id).pipe(
            map((res) => {
            console.log(' Deleted:', res);
            this.spinner.hide();
            this.modalService.dismissAll();
            this.router.navigate(['/requests-customer']);
            this.showSuccessToast('OK!!', res.message, 'success');
            this.store.dispatch(new DeleteRequestSuccess(payload));
          }),
          catchError( error => {
            console.log(' ERROR:', error);
            this.spinner.hide();
            return of(this.showErrorToast('Error!!', error.error.message, 'error'));
          }));
        }));


  showToast(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
}
