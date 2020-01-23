import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, staticPagesState } from './../store/app.states';
import { GetWhoWeArePage } from './../store/actions/static-pages.actions';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit, OnDestroy {

  userLang: any;
  Who_We_Are: any = {
    page_name: 'Who We Are Page',
    Section1: {
      section_name: 'Who We Are',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Our Vision',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Our Mission',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Our Promises',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'The Team',
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
    translate.addLangs(['english', 'arabic']);
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });
  }


  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');
    this.getState.subscribe((state) => {
      if (state.WhoWeArePage == null) {
        this.store.dispatch(new GetWhoWeArePage());
      } else {
        this.Who_We_Are = state.WhoWeArePage;
      }
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');

  }
  btnClick = function () {
    this.router.navigateByUrl('/contact');
  };

}
