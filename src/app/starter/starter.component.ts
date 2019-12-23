import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  userLang: any;
  
    constructor( public router: Router , public translate: TranslateService) {
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
