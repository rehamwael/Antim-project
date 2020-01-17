import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTES } from './menu-items';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './../../store/models/users';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Logout, UserProfile, SaveTotalNotifications } from './../../store/actions/auth.actions';
import { NotificationsService } from '../../services/notifications.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  getState: Observable<any>;
  currentUser: any;
  role: any;
  notificationsCount: any;
  showCount = false;
  userLang: "english";
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
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationsService,
    public translate: TranslateService
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    translate.addLangs([ 'english' , 'arabic']);
    translate.setDefaultLang('english');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/english|arabic/)? browserLang : 'english');
    this.userLang = "english";
    this.translate.onLangChange.subscribe((event) => {
      this.userLang=event.lang;
    });
  }

  // End open close
  ngOnInit() {
    this.getState.subscribe((state) => {
      // console.log( 'state:' , state);
      const token = localStorage.getItem('token');
      if (state.userProfile == null && token) {
        this.store.dispatch(new UserProfile());
      }
      this.currentUser = state.userProfile;
      this.notificationsCount = state.totalUnReadNotifications;
      if (this.notificationsCount == 0) {
        this.showCount = false;
      }
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

    this.notificationService.getNotificationsCount().subscribe(res => {
      console.log(res);
      this.notificationsCount = res.result.count;
      if (this.notificationsCount == 0) {
        this.showCount = false;
      } else {
        this.store.dispatch(new SaveTotalNotifications(this.notificationsCount));
        this.showCount = true;
      }
    }, err => {
      console.log(err);
    });
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

