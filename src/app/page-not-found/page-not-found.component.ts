import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) {
    let language =  localStorage.getItem('language');
    translate.use(language);
  }

  ngOnInit() {
  }

}
