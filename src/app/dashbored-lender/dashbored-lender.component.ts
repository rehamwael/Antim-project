import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';

@Component({
  selector: 'app-dashbored-lender',
  templateUrl: './dashbored-lender.component.html',
  styleUrls: ['./dashbored-lender.component.css']
})
export class DashboredLenderComponent implements OnInit, OnDestroy {
  currentUser: any;
  getState: Observable<any>;
  isAuthenticated: boolean;

  constructor(public router: Router, private userDataService: ProfileService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.getState.subscribe((state) => {
      console.log('state', state);
      const token = localStorage.getItem('token');
      this.currentUser = state.userProfile;
      if (state.userProfile == null && token && state.isAuthenticated == true) {
        this.store.dispatch(new UserProfile());
      }
      // console.log( 'USER:' ,  this.currentUser);
    });
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('dashbored-home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
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
