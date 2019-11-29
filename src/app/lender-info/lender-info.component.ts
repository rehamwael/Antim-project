import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-lender-info',
  templateUrl: './lender-info.component.html',
  styleUrls: ['./lender-info.component.css']
})
export class LenderInfoComponent implements OnInit ,OnDestroy{

  constructor() { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    body.classList.add('who-we-are');
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
    body.classList.remove('who-we-are');

  }

}