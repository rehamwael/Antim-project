import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../../store/app.states';

declare var $: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  userRole: any;
  islogin = false;
  getState: Observable<any>;
  dashboredUrl: any;
  userLang: "english";
// tslint:disable-next-line: indent
	public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router,  private store: Store<AppState>, public translate: TranslateService) {
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

  public innerWidth: any;
  public defaultSidebar: any;
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = 'full';
  public navbarOpen = false;
  public isSticky = false;



  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    const role = localStorage.getItem('role');
    this.userRole = role;
    this.dashboredUrl = 'dashbored-' + role;
    this.getState.subscribe((state) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    });
    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = 'mini-sidebar';
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case 'full':
        this.sidebartype = 'mini-sidebar';
        break;

      case 'mini-sidebar':
        this.sidebartype = 'full';
        break;

      default:
    }
  }
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }
    btnClick = function () {
      this.router.navigateByUrl('/signup');
    };
    closeMenu() {
      const isMobile = /iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Android/i.test(navigator.userAgent);
      if (isMobile) {
        this.navbarOpen = !this.navbarOpen;
      }
    }

}
