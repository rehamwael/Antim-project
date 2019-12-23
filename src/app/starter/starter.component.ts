import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  userLang: any;
  
    constructor( public translate: TranslateService) {
        this.translate.onLangChange.subscribe((event) => {
          this.userLang=event.lang;
          console.log(this.userLang); 
        });
    }

  ngOnInit() {
  }

}
