import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../services/userProfile.service';


@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit , OnDestroy {

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
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');
    this.profileService.getStaticPageByKey('WhoWeArePage').subscribe(res => {
      // console.log(res);
      this.Who_We_Are = JSON.parse(res.result.sections);
      // console.log(this.Who_We_Are);
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
  btnClick = function () {
    this.router.navigateByUrl('/contact');
  };

}
