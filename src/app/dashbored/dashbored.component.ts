import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState, customerState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';
import { GetCustomerRequestCount } from './../store/actions/customer.actions';
import { CustomerRequestService } from '../services/customer-request.service';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../services/userProfile.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})

export class DashboredComponent implements OnInit, OnDestroy {
  currentUser: any;
  customerRequests: any;
  getState: Observable<any>;
  getCustomerState: Observable<any>;
  isAuthenticated: boolean;
  email: any;
  options: IndividualConfig;

  constructor(
    private emailService: UserEmailPasswordService,
    public router: Router,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    public translate: TranslateService,
    private titleService: Title

  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.getCustomerState = this.store.select(customerState);

    this.translate.setDefaultLang(this.translate.currentLang);
    this.translate.use(this.translate.currentLang);

  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      // console.log('state', state);
      let token = localStorage.getItem('token');
      let role = localStorage.getItem('role');
      if (state.userProfile == null && token && state.isAuthenticated == true && role == 'customer') {
        this.store.dispatch(new UserProfile());
      }
      this.currentUser = state.userProfile;
      // console.log('USER:', this.currentUser);
      if (this.currentUser) {
        this.email = this.currentUser.email;
      }
    });

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('dashbored-home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.getCount();
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('dashbored-home');
    this.currentUser = null;
    this.customerRequests = null;
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    if (lang == 'arabic') {
      this.titleService.setTitle('انتيم');
    } else {
      this.titleService.setTitle('Antim');
    }
  }
  getCount() {
    let role = localStorage.getItem('role');
    this.getCustomerState.subscribe((state) => {
      this.customerRequests = state.customerRequestCount;
      if (state.customerRequestCount == null && role == 'customer') {
        this.store.dispatch(new GetCustomerRequestCount());
      }
    });

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

  resendEmail() {
    this.spinner.show();
    this.emailService.resendRegisterEmail({
      'Email': this.email
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.profileService.showSuccessToastr(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }
  SetTitle(enTitle, arTitle) {
    if (this.translate.currentLang == 'arabic') {
      this.titleService.setTitle( arTitle );
    } else {
      this.titleService.setTitle( enTitle );
    }
  }


}
