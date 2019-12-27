import { Component, OnInit , OnDestroy} from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notification-lender',
  templateUrl: './notification-lender.component.html',
  styleUrls: ['./notification-lender.component.css']
})
export class NotificationLenderComponent implements OnInit , OnDestroy {
  allNotifications: any;
  funderNotifications: any = [];
  // isCollapsed1 = false;
  // isCollapsed2 = false;


  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;
  getNotifications = true;

  constructor(
    private notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('notification');
    this.spinner.show();
    this.notificationService.getUserNotifications().subscribe(res => {
      this.spinner.hide();
      console.log(res.result);
      this.allNotifications = res.result;
      if (this.allNotifications.length > 0) {
        this.getNotifications = true;
      this.allNotifications.forEach(element => {
        this.funderNotifications.push(element);
        element.date = moment(element.createdAt).format('LL');
      });
    }  else {
      this.getNotifications = false;
    }
    }, err => {
      this.spinner.hide();
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

  selectFromDate(evt: any) {
    this.fromDate = new Date(evt.year, evt.month - 1, evt.day);
    this.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    this.toDate = '';
    // this.disableSearch = true;
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    if (this.fromDate && this.toDate) {
      this.disableSearch = true;
    }
  }
  filterRequests() {
  }
  resetPage() {

  }

}
