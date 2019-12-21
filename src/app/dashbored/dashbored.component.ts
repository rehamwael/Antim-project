import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile, GetCustomerRequestCount } from './../store/actions/auth.actions';
import { CustomerRequestService } from '../services/customer-request.service';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})

export class DashboredComponent implements OnInit, OnDestroy {
  currentUser: any;
  customerRequests: any;
  onGoing: any;
  rejected: any;
  closed: any;
  awaiting: any;
  draft: any;
  underReview: any;
  accepted: any;
  getState: Observable<any>;
  isAuthenticated: boolean;

  constructor(public router: Router,
    private userDataService: ProfileService,
    private store: Store<AppState>,
    private customerRequestService: CustomerRequestService
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
      console.log( 'USER:' ,  this.currentUser);
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
  getCount() {
    const role = localStorage.getItem('role');
    this.getState.subscribe((state) => {
      this.customerRequests = state.customerRequestCount;
      if (state.customerRequestCount == null && state.isAuthenticated == true && role == 'customer') {
        this.store.dispatch(new GetCustomerRequestCount());
      }
    });

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

}
