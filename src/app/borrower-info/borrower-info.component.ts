import { Component, OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-borrower-info',
  templateUrl: './borrower-info.component.html',
  styleUrls: ['./borrower-info.component.css']
})
export class BorrowerInfoComponent implements OnInit , OnDestroy {

  userLang: any;

  constructor(public translate: TranslateService) {
      this.translate.onLangChange.subscribe((event) => {
        this.userLang = event.lang;
        console.log(this.userLang);
      });
  }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');

  }
}
