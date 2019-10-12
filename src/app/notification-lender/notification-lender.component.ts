import { Component, OnInit ,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-notification-lender',
  templateUrl: './notification-lender.component.html',
  styleUrls: ['./notification-lender.component.css']
})
export class NotificationLenderComponent implements OnInit ,OnDestroy {

  constructor() { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('notification');

  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('notification');

  }
  toggleNavbar(){
    window.document.querySelector(".left-sidebar").classList.toggle("showmobile")

  }

}
