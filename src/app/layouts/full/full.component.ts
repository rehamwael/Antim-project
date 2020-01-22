import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Title } from '@angular/platform-browser';

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
  userLang: any;
  token: any;
// tslint:disable-next-line: indent
	public config: PerfectScrollbarConfigInterface = {};

  constructor(
    public router: Router,
    private store: Store<AppState>,
    public translate: TranslateService,
    private titleService: Title
    ) {
    let language = localStorage.getItem('language');
    // console.log(language);
    if (language != null) {
      this.translate.use(language);
      this.userLang = language;
    } else {
      this.userLang = 'english';
    }
    console.log(this.userLang);

    this.getState = this.store.select(selectAuthenticationState);
      this.getState.subscribe((state) => {
        const token = localStorage.getItem('token');
        if (state.loggedIn == true || token) {
          this.islogin = true;
        } else {
          this.islogin = false;
        }
      });
      translate.addLangs([ 'english' , 'arabic']);
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/english|arabic/) ? browserLang : 'english');
      this.translate.onLangChange.subscribe((event) => {
        this.userLang = event.lang;
        localStorage.setItem('language', this.userLang);
      });
      translate.setDefaultLang(this.userLang);

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
    if (lang == 'arabic') {
      this.titleService.setTitle( 'انتيم' );
    } else {
      this.titleService.setTitle( 'Antim' );
    }
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
    closeMenuAndSetTitle(enTitle, arTitle) {
      if (this.userLang == 'arabic') {
        this.titleService.setTitle( arTitle );
      } else {
        this.titleService.setTitle( enTitle );
      }
      const isMobile = /iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Android/i.test(navigator.userAgent);
      if (isMobile) {
        this.navbarOpen = !this.navbarOpen;
      }
    }
    setTitle(enTitle, arTitle) {
      if (this.userLang == 'arabic') {
        this.titleService.setTitle( arTitle );
      } else {
        this.titleService.setTitle( enTitle );
      }
      this.router.navigateByUrl('/home');
    }

}
