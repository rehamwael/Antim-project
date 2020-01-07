import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-notification-lender',
  templateUrl: './notification-lender.component.html',
  styleUrls: ['./notification-lender.component.css']
})
export class NotificationLenderComponent implements OnInit, OnDestroy {
  allNotifications: any;
  funderNotifications: any = [];
  filterNotifications: any;

  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;
  getNotifications = true;
  options: IndividualConfig;
  userLang: any;
  DisableButton = false;

  constructor(
    private notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    public translate: TranslateService,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.userLang = this.translate.currentLang;
  }

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
          element.arDate = moment(element.createdAt).locale('ar-sa').format('LL');
        });
      } else {
        this.getNotifications = false;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.profileService.showErrorToastr(err.error.message);
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
    this.spinner.show();
    this.notificationService.filterByDateNotifications(this.fromDate, this.toDate).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res.message) {
        this.getNotifications = false;
        this.disableReset = true;
        this.disableSearch = false;
        this.profileService.showErrorToastr(res.message);
      } else {
        this.filterNotifications = res.result;
        this.allNotifications = null;
        this.allNotifications = this.filterNotifications;
        this.getNotifications = true;
        this.disableReset = true;
        this.disableSearch = false;
        this.funderNotifications.length = 0;
        this.allNotifications.forEach(element => {
          this.funderNotifications.push(element);
          element.date = moment(element.createdAt).format('LL');
        });
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }
  resetPage() {
    this.ngOnInit();
    this.fromDate = '';
    this.toDate = '';
    this.disableSearch = false;
    this.disableReset = false;
  }

  markAsReadNotification(id: any) {
    this.spinner.show();
    this.notificationService.readNotification(id).subscribe(res => {
      this.ngOnInit();
      console.log(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }

}
