import { Component, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../services/userProfile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit , OnDestroy {
  userLang: any;
  TermsConditions: any = {
    page_name: 'Terms And Conditions Page',
    Section: {
      section_name: 'Terms And Conditions',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: '',
      ParagraphEn: '',
      ParagraphAr: '',
      EnBulletPoints: [{
        bulletPoint: ''
      }],
      ArBulletPoints:  [{
        bulletPoint: ''
      }],
    },
  };

  constructor(
    public translate: TranslateService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) {
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });
  }


  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');

    this.spinner.show();
    this.profileService.getStaticPageByKey('TermsAndConditionsPage').subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      this.TermsConditions = JSON.parse(res.result.sections);
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');
  }

}
