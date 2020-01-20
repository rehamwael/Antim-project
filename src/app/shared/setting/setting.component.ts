import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { ProfileService } from './../../services/userProfile.service';
import { Logout, UserProfile } from './../../store/actions/auth.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, OnDestroy {
  getState: Observable<any>;
  currentUser: any;
  userId: any;

  options: IndividualConfig;
  userLang: any;

  constructor(
    public router: Router,
    private modalService: NgbModal,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private userProfileService: ProfileService,
    private toastr: ToastrService, public translate: TranslateService
  ) {
    let language = localStorage.getItem('language');
    console.log(language);
    this.translate.use(language);

    this.getState = this.store.select(selectAuthenticationState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    translate.addLangs([ 'english' , 'arabic']);
    this.userLang = language;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
      localStorage.setItem('language', this.userLang);
    });


  }


  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.currentUser = state.userProfile;
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    this.currentUser = null;
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  deleteAccount() {
    this.userId = this.currentUser.id;
    this.spinner.show();
    this.userProfileService.deleteUser(this.userId).subscribe(res => {
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
    this.userId = this.currentUser.id;
    this.spinner.show();
    this.userProfileService.deActivateUser(this.userId).subscribe(res => {
      localStorage.removeItem('token');
      this.modalService.dismissAll();
      console.log(res);
      this.spinner.hide();
      this.logOut();
      this.userProfileService.showSuccessToastr(res);
      console.log(res);
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

}


