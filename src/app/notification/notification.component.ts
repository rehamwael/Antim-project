import { Component, OnInit , OnDestroy} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit , OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = false;
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