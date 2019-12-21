import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';
import { FunderRequestService } from '../services/funder-requests.service';

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

  constructor(public router: Router,
    private userDataService: ProfileService,
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
}
