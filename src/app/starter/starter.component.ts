import { Component, AfterViewInit ,OnInit
 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit ,OnInit{
  subtitle: string;
  userLang: any;
  
  constructor(public router: Router, public translate: TranslateService) {
    translate.addLangs([ 'english' , 'arabic']);
    translate.setDefaultLang('english');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/english|arabic/)? browserLang : 'english');
    this.translate.onLangChange.subscribe((event) => {
      this.userLang=event.lang;
      console.log(this.userLang); 
    });

  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
}
  ngAfterViewInit() {}
  btnClick= function () {
    this.router.navigateByUrl('/signup');
  };
}
