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

import { AuthService } from '../../auth/auth.service';
import {
  AuthenticationActionTypes,
  Login, LoginSuccess, LoginFailure, Logout, UserProfile, SaveUserProfile, EditUserProfile,
} from '../actions/auth.actions';
import { AppState } from '../app.states';
import { CustomerRequestService } from 'src/app/services/customer-request.service';
import {
  CustomerActionTypes, SaveAllCustomerRequests, EditCustomerRequest, DeleteCustomerRequests, GetRequestsCountSuccess,
  DeleteRequestSuccess, AddCustomerRequest, IsUpdatedTrue, IsApiCallTrue, AddCustomerRequestSuccess, GetAllRequestsFailure, RemoveRequestsFromStore
} from '../actions/customer.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class AuthenticationEffects {
  userRole: string;
  userLang: any;

  constructor(private modalService: NgbModal,
    private actions: Actions,
    private authenticationService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userDataService: ProfileService,
    private store: Store<AppState>,
    private customerService: CustomerRequestService,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
  ) {
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
              // console.log('in ngrx effects :', user);
              const decoded = jwt_decode(user.access_token);
              this.userRole = decoded.role;
              localStorage.setItem('token', user.access_token);
              localStorage.setItem('role', this.userRole);
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
      // localStorage.setItem('token', user.payload.token);
      // localStorage.setItem('role', user.payload.role);
      this.store.dispatch(new UserProfile());
      this.router.navigateByUrl('/dashbored-' + this.userRole);
    })
  );

  @Effect({ dispatch: false })
  LoginFailure: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGIN_FAILURE),
    tap((res) => {
      console.log(res);
      if (res.payload.error.error_description) {
        this.userDataService.showErrorToastr(res.payload.error.error_description);
      } else {
        this.userDataService.showErrorToastr('The email address and password that you\'ve entered doesn\'t match any account. Please try again. | عنوان البريد الإلكتروني وكلمة المرور اللذين أدخلتهما لا يتطابقان مع أي حساب. حاول مرة اخرى.');
      }
    })
  );

  @Effect({ dispatch: false })
  public Logout: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.LOGOUT),
    tap((user) => {
      this.store.dispatch(new RemoveRequestsFromStore());
      localStorage.clear();
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
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      }));

  @Effect({ dispatch: false })
  GetCustomerRequestCount: Observable<any> = this.actions
    .pipe(
      ofType(CustomerActionTypes.GET_REQUESTS_COUNT),
      tap(() => {
        this.spinner.show();
        return this.customerService.getCustomerDashboard().subscribe(res => {
          if (res.message) {
            this.spinner.hide();
            this.userDataService.showErrorToastr(res.message);
          } else {
            console.log('requestCount:', res.result);
            this.store.dispatch(new GetRequestsCountSuccess(res.result));
            this.spinner.hide();
          }
        }, err => {
          console.log('Error', err);
          this.spinner.hide();
        });
      }));

  @Effect({ dispatch: false })
  EditUser: Observable<any> = this.actions.pipe(
    ofType(AuthenticationActionTypes.EDIT_USER_PROFILE),
    map((action: EditUserProfile) => action.payload),
    switchMap(payload => {
      this.spinner.show();
      // console.log('huhuh',payload);
      return this.userDataService.editUser(payload).pipe(
        map((res) => {
          this.userLang = this.translate.currentLang;
          console.log('User Info edited:', res);
          this.spinner.hide();
          this.userDataService.showSuccessToastr(res);
        }),
        catchError(error => {
          console.log(' ERROR:', error);
          this.spinner.hide();
          return of(this.userDataService.showErrorToastr(error.error.message));
        }));
    }));

  @Effect({ dispatch: false })
  GetAllCustomerRequests: Observable<any> = this.actions.pipe(
    ofType(CustomerActionTypes.GET_ALL_REQUESTS),
    tap(() => {
      this.spinner.show();
      return this.customerService.customerAllRequests().subscribe(res => {
        console.log(res);
        if (res.result) {
          this.store.dispatch(new SaveAllCustomerRequests(res.result));
        }
        if (res.message) {
          this.store.dispatch(new GetAllRequestsFailure());
          this.userDataService.showErrorToastr(res.message);
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        console.log('Error:', err.error);
      });
    }));

  @Effect({ dispatch: false })
  AddCustomersRequest: Observable<any> = this.actions.pipe(
    ofType(CustomerActionTypes.ADD_REQUEST),
    map((action: AddCustomerRequest) => action.payload),
    switchMap(payload => {
      this.spinner.show();
      return this.customerService.AddCustomerRequest(payload).pipe(
        map((res) => {
          console.log(' Added:', res);
          this.store.dispatch(new AddCustomerRequestSuccess(res.result));
          this.spinner.hide();
          this.store.dispatch(new IsUpdatedTrue());
          this.userDataService.showSuccessToastr(res);
          this.router.navigate(['/requests-customer']);
        }),
        catchError(error => {
          console.log(' ERROR:', error);
          this.spinner.hide();
          return of(this.userDataService.showErrorToastr(error.error.message));
        }));
    }));

  @Effect({ dispatch: false })
  EditCustomerRequests: Observable<any> = this.actions.pipe(
    ofType(CustomerActionTypes.EDIT_REQUEST),
    map((action: EditCustomerRequest) => action.payload),
    switchMap(payload => {
      this.spinner.show();
      return this.customerService.EditCustomerRequest(payload).pipe(
        map((res) => {
          console.log(' Edited:', res);
          this.store.dispatch(new IsUpdatedTrue());
          this.spinner.hide();
          this.userDataService.showSuccessToastr(res);
          this.router.navigate(['/requests-customer']);
        }),
        catchError(error => {
          console.log(' ERROR:', error);
          this.spinner.hide();
          return of(this.userDataService.showErrorToastr(error.error.message));
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
          this.userDataService.showSuccessToastr(res);
          this.store.dispatch(new DeleteRequestSuccess(payload));
        }),
        catchError(error => {
          console.log(' ERROR:', error);
          this.modalService.dismissAll();
          this.spinner.hide();
          return of(this.userDataService.showErrorToastr(error.error.message));
        }));
    }));


}
