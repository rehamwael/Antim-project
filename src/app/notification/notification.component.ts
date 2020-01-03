import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  allNotifications: any;
  filterNotifications: any;
  customerNotifications: any = [];
  getNotifications = true;

  fromDate = null;
  toDate = null;
  disableReset: boolean;
  disableSearch: boolean;
  options: IndividualConfig;
  userLang: any;

  constructor(
    private notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public translate: TranslateService,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.userLang = this.translate.currentLang;
    console.log(this.translate.currentLang);
  }

  ngOnInit(): void {
    this.disableReset = false;
    this.disableSearch = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('notification');
    this.spinner.show();
    this.notificationService.getUserNotifications().subscribe(res => {
      this.spinner.hide();
      console.log(res.result);
      this.allNotifications = res.result;
      if (this.allNotifications.length > 0) {
        this.customerNotifications.length = 0;
        this.getNotifications = true;
        this.allNotifications.forEach(element => {
          this.customerNotifications.push(element);
          element.date = moment(element.createdAt).format('LL');
        });
      } else {
        this.getNotifications = false;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
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
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  filterRequests() {
    this.spinner.show();
    this.notificationService.filterByDateNotifications(this.fromDate, this.toDate).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res.message) {
        this.getNotifications = false;
        this.disableReset = true;
        this.disableSearch = false;
        this.showErrorToast('', res.message, 'error');
      } else {
        this.filterNotifications = res.result;
        this.allNotifications = null;
        this.allNotifications = this.filterNotifications;
        this.getNotifications = true;
        this.disableReset = true;
        this.disableSearch = false;
        this.customerNotifications.length = 0;
        this.allNotifications.forEach(element => {
          this.customerNotifications.push(element);
          element.date = moment(element.createdAt).format('LL');
        });
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  resetPage() {
    this.ngOnInit();
    this.fromDate = '';
    this.toDate = '';
    this.disableSearch = false;
    this.disableReset = false;
  }
}
