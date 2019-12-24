import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public lang;
  public ltrrtl: string;
  constructor(public translate: TranslateService) {

    this.translate.onLangChange.subscribe((event) => {
      this.lang=event.lang;
      if (event.lang == 'ar') {
      this.ltrrtl = 'rtl';
      }
      else {
      this.ltrrtl = 'ltr';
      }
      document.getElementsByTagName("html")[0].setAttribute('lang', this.lang);
      document.getElementsByTagName("body")[0].setAttribute('dir', this.ltrrtl);
      });
  }
}
