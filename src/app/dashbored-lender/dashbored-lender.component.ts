import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';
import { FunderRequestService } from '../services/funder-requests.service';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashbored-lender',
  templateUrl: './dashbored-lender.component.html',
  styleUrls: ['./dashbored-lender.component.css']
})
export class DashboredLenderComponent implements OnInit, OnDestroy {
  currentUser: any;
  getState: Observable<any>;
  isAuthenticated: boolean;
  funderDashboardData: any;
  email: any;
  options: IndividualConfig;

  constructor(
    private emailService: UserEmailPasswordService,
    private toastr: ToastrService,
    public router: Router,
    private funderService: FunderRequestService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      console.log('state', state);
      const token = localStorage.getItem('token');
      this.currentUser = state.userProfile;
      if (state.userProfile == null && token && state.isAuthenticated == true) {
        this.store.dispatch(new UserProfile());
      }
      // console.log( 'USER:' ,  this.currentUser);
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
    this.funderService.getFunderDashboardData().subscribe(res => {
      this.funderDashboardData = res.result;
      console.log(this.funderDashboardData);
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('dashbored-home');
    this.currentUser = null;
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  resendEmail() {
    this.emailService.resendRegisterEmail({
      'Email': this.email
    }).subscribe(res => {
      console.log(res);
      this.showSuccessToast('OK!!', res.message, 'success');
    }, err => {
      console.log(err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

}
