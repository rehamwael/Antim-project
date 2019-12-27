import { Component, OnInit , OnDestroy} from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit , OnDestroy {
  allNotifications: any;
  isCollapsed1 = false;
  isCollapsed2 = false;
  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('notification');
    this.notificationService.getUserNotifications().subscribe(res => {
      console.log(res);
      this.allNotifications = res.result;
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('notification');

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }

}
