import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, staticPagesState } from './../store/app.states';
import { GetHomePage } from './../store/actions/static-pages.actions';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  userLang: any;
  HomePage: any = {
    page_name: 'Home Page',
    Section1: {
      section_name: 'Fast Approval',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Open Purchases',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Immediant Fund',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'We made it easy for you',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'Responsive layout',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    }
  };
  getState: Observable<any>;

  constructor(
    public router: Router,
    public translate: TranslateService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(staticPagesState);
    this.userLang = this.translate.currentLang;
    translate.addLangs(['english', 'arabic']);
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);

    });

    this.getState.subscribe((state) => {
      if (state.HomePage == null) {
        this.store.dispatch(new GetHomePage());
      } else {
        this.HomePage = state.HomePage;
      }
    });

  }
  btnClick = function () {
    this.router.navigateByUrl('/signup');
  };
}
