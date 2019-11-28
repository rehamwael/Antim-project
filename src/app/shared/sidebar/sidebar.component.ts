import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './../../store/models/users';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Logout } from './../../store/actions/auth.actions';
import { ProfileService } from '../../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfile } from './../../store/actions/auth.actions';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: User;
  getState: Observable<any>;
  isAuthenticated = false;
  currentUser: any;


  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  public href = '';
  public userType = '';
  public requestUrl = '';
  public dashboredUrl = '';
  public profileUrl = '';
  public notificationUrl = '';

  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private userDataService: ProfileService,
    private spinner: NgxSpinnerService,
    ) {
      this.getState = this.store.select(selectAuthenticationState);
    }

  // End open close
  ngOnInit() {
    // this.spinner.show();

    // this.currentUser = this.store.select(state => state.authenticationState.userProfile);


    this.getState.subscribe((state) => {
      console.log('state bhai', state);
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.currentUser = state.userProfile;
      console.log('user bhai', this.currentUser);
      if (!this.currentUser) {
        this.store.dispatch(new UserProfile());
        // this.userDataService.getUserData().subscribe(res => {
        //   this.store.dispatch(new UserProfile(res.result));
        //    this.currentUser = res.result;
        //  });
      }
    });
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.href = this.router.url;
    const x = this.href.split('/')[1].split('-');
    this.userType = x[1];
    this.requestUrl = 'requests-' + this.userType;
    this.dashboredUrl = 'dashbored-' + this.userType;
    this.profileUrl = 'profile-' + this.userType;
    this.notificationUrl = 'notification-' + this.userType;

  }
  logout() {
    this.store.dispatch(new Logout);
    console.log('logout.');
  }
}

