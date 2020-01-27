import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, staticPagesState } from './../store/app.states';
import { GetLenderPage } from './../store/actions/static-pages.actions';

@Component({
  selector: 'app-lender-info',
  templateUrl: './lender-info.component.html',
  styleUrls: ['./lender-info.component.css']
})
export class LenderInfoComponent implements OnInit, OnDestroy {

  userLang: any;
  LenderPage: any = {
    page_name: 'Lender Page',
    Section1: {
      section_name: 'Purchase of various products (in installments).',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Small borrowing amounts',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Low and steady profit margin',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Product delivery service.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'Electronic financing process.',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section6: {
      section_name: 'Step One',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section7: {
      section_name: 'Step Two',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section8: {
      section_name: 'Step Three',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section9: {
      section_name: 'Terms of application',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
    },
    Section10: {
      section_name: 'Required Documents',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
    },
    Section11: {
      section_name: 'Application criteria',
      TitleEn: '',
      TitleAr: '',
      Content1En: '',
      Content2En: '',
      Content3En: '',
      Content4En: '',
      Content5En: '',
      Content1Ar: '',
      Content2Ar: '',
      Content3Ar: '',
      Content4Ar: '',
      Content5Ar: ''
    }
  };
  getState: Observable<any>;
  image = 'assets/images/tab1.png';
  status1 = true;
  status2 = false;
  status3 = false;

  constructor(
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
      if (state.LenderPage == null) {
        this.store.dispatch(new GetLenderPage());
      } else {
        this.LenderPage = state.LenderPage;
      }
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');

  }
  changeImage(Image: any) {
    this.image = Image;
    if (Image == 'assets/images/tab1.png') {
      this.status1 = true;
      this.status2 = false;
      this.status3 = false;
    }
    if (Image == 'assets/images/tab2.png') {
      this.status1 = false;
      this.status2 = true;
      this.status3 = false;
    }
    if (Image == 'assets/images/asad.png') {
      this.status1 = false;
      this.status2 = false;
      this.status3 = true;
    }
  }


}
