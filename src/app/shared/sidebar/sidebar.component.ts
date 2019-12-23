import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './../../store/models/users';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Logout, UserProfile } from './../../store/actions/auth.actions';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  getState: Observable<any>;
  currentUser: any;
  role: any;


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
  ) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  // End open close
  ngOnInit() {
    this.getState.subscribe((state) => {
      const token = localStorage.getItem('token');
      if (state.userProfile == null && token) {
        this.store.dispatch(new UserProfile());
      }
      this.currentUser = state.userProfile;
      if (this.currentUser) {
        if (this.currentUser.roles[0] == 'customer') {
          this.role = 'Borrower';
        } else if (this.currentUser.roles[0] == 'funder') {
          this.role = 'Lender';
        } else {
          this.role = '';
        }
      }
    });
    // console.log( 'USER:' ,  this.currentUser);
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.href = this.router.url;
    const x = this.href.split('/')[1].split('-');
    this.userType = x[1];
    this.requestUrl = 'requests-' + this.userType;
    this.dashboredUrl = 'dashbored-' + this.userType;
    this.profileUrl = 'profile-' + this.userType;
    this.notificationUrl = 'notification-' + this.userType;
  }
  ngOnDestroy(): void {
    this.currentUser = null;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    this.store.dispatch(new Logout());
  }
}

