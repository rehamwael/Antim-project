import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  userLang: 'english';
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

    constructor(
      public router: Router,
      private profileService: ProfileService,
      public translate: TranslateService
      ) {
      translate.addLangs([ 'english' , 'arabic']);
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
    this.profileService.getStaticPageByKey('HomePage').subscribe(res => {
      // console.log(res);
      this.HomePage = JSON.parse(res.result.sections);
      // console.log(this.HomePage);
    }, err => {
      console.log(err);
    });

  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {}
  btnClick = function () {
    this.router.navigateByUrl('/signup');
  };
}
