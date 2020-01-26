import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { ProfileService } from './../services/userProfile.service';
import { Logout, UserProfile } from './../store/actions/auth.actions';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashbored-navbar',
  templateUrl: './dashbored-navbar.component.html',
  styleUrls: ['./dashbored-navbar.component.css']
})

export class DashboredNavbarComponent implements OnInit {


  getState: Observable<any>;
  currentUser: any;
  userId: any;

  userLang: any;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private userProfileService: ProfileService,
    public translate: TranslateService,
    private titleService: Title

  ) {
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    if (lang == 'arabic') {
      this.titleService.setTitle('انتيم');
    } else {
      this.titleService.setTitle('Antim');
    }
  }

  ngOnInit() {
  }
  deleteAccount() {
    this.spinner.show();
    this.userProfileService.deleteUser().subscribe(res => {
      localStorage.removeItem('token');
      this.modalService.dismissAll();
      this.logOut();
      this.spinner.hide();
      this.userProfileService.showSuccessToastr(res);
      console.log(res);
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.modalService.dismissAll();
      this.userProfileService.showErrorToastr(err.error.message);
    });
  }
  deActivateAccount() {
    this.spinner.show();
    this.userProfileService.deActivateUser().subscribe(res => {
      localStorage.removeItem('token');
      this.modalService.dismissAll();
      console.log(res);
      this.spinner.hide();
      this.logOut();
      this.userProfileService.showSuccessToastr(res);
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.modalService.dismissAll();
      this.userProfileService.showErrorToastr(err.error.message);
    });
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: false });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    this.store.dispatch(new Logout());
  }
  setTitle(enTitle, arTitle) {
    if (this.userLang == 'arabic') {
      this.titleService.setTitle(arTitle);
    } else {
      this.titleService.setTitle(enTitle);
    }
    this.router.navigateByUrl('/home');
  }

}
