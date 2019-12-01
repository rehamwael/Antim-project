import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit , OnDestroy {
  currentUser: any;
  getState: Observable<any>;

  constructor(public router: Router,
    private userDataService: ProfileService,
    private store: Store<AppState>,
    ) {
      this.getState = this.store.select(selectAuthenticationState);
     }

  ngOnInit(): void {
    // this.userDataService.getUserData().subscribe(res => {
    //   this.currentUser = res.result;
    //   console.log('user:', res.result);
    // });
    this.getState.subscribe((state) => {
      this.currentUser = state.userProfile;
      // console.log( 'dash' ,  this.currentUser);
      if (!this.currentUser) {
        this.store.dispatch(new UserProfile());
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
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('dashbored-home');

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

}
