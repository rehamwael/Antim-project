import { Component, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-borrower-info',
  templateUrl: './borrower-info.component.html',
  styleUrls: ['./borrower-info.component.css']
})
export class BorrowerInfoComponent implements OnInit , OnDestroy {
  userLang: any;
  BorrowerPage: any = {
    page_name: 'Borrower Page',
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

  constructor(public translate: TranslateService, private profileService: ProfileService) {
    translate.addLangs([ 'english' , 'arabic']);
      this.translate.onLangChange.subscribe((event) => {
        this.userLang = event.lang;
      });
  }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');

    this.profileService.getStaticPageByKey('BorrowerPage').subscribe(res => {
      // console.log(res);
      this.BorrowerPage = JSON.parse(res.result.sections);
      // console.log(this.BorrowerPage);
    }, err => {
      console.log(err);
      this.profileService.showErrorToastr(' Some Error Occurred. | حدث بعض الخطأ ');
    });


  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');

  }
}
