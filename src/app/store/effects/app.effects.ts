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
  Login, LoginSuccess, LoginFailure, Logout, UserProfile, SaveUserProfile, EditUserProfile, AccountDeActivate, EditUserProfileSuccess
} from '../actions/auth.actions';
import { AppState } from '../app.states';
import { CustomerRequestService } from 'src/app/services/customer-request.service';
import {
  CustomerActionTypes, SaveAllCustomerRequests, EditCustomerRequest, DeleteCustomerRequests, DeleteDraftRequest, GetRequestsCountSuccess,
  DeleteRequestSuccess, AddCustomerRequest, IsUpdatedTrue, IsApiCallTrue, GetAllRequestsFailure, RemoveRequestsFromStore, GetAllCustomerRequests
} from '../actions/customer.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { StaticPagesActionTypes, SaveHomePage, SaveWhoWeArePage, SaveBorrowerPage, SaveContactUsPage, SaveLenderPage } from '../actions/static-pages.actions';


@Injectable()
export class AuthenticationEffects {
  userRole: string;

  constructor(private modalService: NgbModal,
    private actions: Actions,
    private authenticationService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userDataService: ProfileService,
    private store: Store<AppState>,
    private customerService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private titleService: Title,
    public translate: TranslateService,
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
              let decoded = jwt_decode(user.access_token);
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

      this.store.dispatch(new UserProfile());

      if (this.translate.currentLang == 'arabic') {
        this.titleService.setTitle(' انتيم | لوحة القيادة ');
      } else {
        this.titleService.setTitle('Antim | Dashboard');
      }
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
        if (res.payload.error.error_description == 'Please Activate Your Account | يرجى تفعيل حسابك') {
          this.store.dispatch(new AccountDeActivate());
        }
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
          this.userDataService.getENUMvalues().subscribe(result => {
            // console.log(result);
            // this.store.dispatch(new SaveEnumConfigs(result.result));
            localStorage.setItem('EnumConfigs', JSON.stringify(result.result));
          }, err => {
            console.log(err);
          });
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
          this.store.dispatch(new EditUserProfileSuccess(payload));
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
        this.store.dispatch(new IsApiCallTrue());
        console.log(res);
        this.spinner.hide();
        if (res.result) {
          this.store.dispatch(new SaveAllCustomerRequests(res.result));
        }
        if (res.message) {
          // this.userDataService.showErrorToastr(res.message);
          this.store.dispatch(new GetAllRequestsFailure());
        }
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
          this.customerService.customerAllRequests().subscribe(result => {
            this.spinner.hide();
            console.log(result);
            if (result.result) {
              this.store.dispatch(new SaveAllCustomerRequests(result.result));
              this.router.navigate(['/requests-customer']);
            }
          }, err => {
            console.log('Error:', err.error);
          });
          console.log(' Added:', res);

          this.store.dispatch(new IsUpdatedTrue());
          this.userDataService.showSuccessToastr(res);
          if (this.translate.currentLang == 'arabic') {
            this.titleService.setTitle(' انتيم | طلباتي ');
          } else {
            this.titleService.setTitle('Antim | My Requests');
          }
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
      return this.customerService.cancelCustomerRequest(payload.id).pipe(
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

  @Effect({ dispatch: false })
  DeleteDraftRequest: Observable<any> = this.actions.pipe(
    ofType(CustomerActionTypes.DELETE_DRAFT_REQUEST),
    map((action: DeleteDraftRequest) => action.payload),
    switchMap(payload => {
      this.spinner.show();
      return this.customerService.DeleteDraftRequest(payload.id).pipe(
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

  @Effect({ dispatch: false })
  GetHomePage: Observable<any> = this.actions
    .pipe(
      ofType(StaticPagesActionTypes.GET_HOME_PAGE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getStaticPageByKey('HomePage').subscribe(res => {
          this.store.dispatch(new SaveHomePage(JSON.parse(res.result.sections)));
        }, err => {
          console.log(err);
          this.userDataService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
        });
      }));

  @Effect({ dispatch: false })
  GetWhoWeArePage: Observable<any> = this.actions
    .pipe(
      ofType(StaticPagesActionTypes.GET_WHO_WE_ARE_PAGE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getStaticPageByKey('WhoWeArePage').subscribe(res => {
          this.store.dispatch(new SaveWhoWeArePage(JSON.parse(res.result.sections)));
        }, err => {
          console.log(err);
          this.userDataService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
        });
      }));

  @Effect({ dispatch: false })
  GetLenderPage: Observable<any> = this.actions
    .pipe(
      ofType(StaticPagesActionTypes.GET_LENDER_PAGE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getStaticPageByKey('LenderPage').subscribe(res => {
          this.store.dispatch(new SaveLenderPage(JSON.parse(res.result.sections)));
        }, err => {
          console.log(err);
          this.userDataService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
        });
      }));


  @Effect({ dispatch: false })
  GetBorrowerPage: Observable<any> = this.actions
    .pipe(
      ofType(StaticPagesActionTypes.GET_BORROWER_PAGE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getStaticPageByKey('BorrowerPage').subscribe(res => {
          this.store.dispatch(new SaveBorrowerPage(JSON.parse(res.result.sections)));
        }, err => {
          console.log(err);
          this.userDataService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
        });
      }));


  @Effect({ dispatch: false })
  GetContactUsPage: Observable<any> = this.actions
    .pipe(
      ofType(StaticPagesActionTypes.GET_CONTACT_US_PAGE),
      tap(() => {
        this.spinner.show();
        return this.userDataService.getStaticPageByKey('ContactUsPage').subscribe(res => {
          this.store.dispatch(new SaveContactUsPage(JSON.parse(res.result.sections)));
        }, err => {
          console.log(err);
          this.userDataService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
        });
      }));

}
