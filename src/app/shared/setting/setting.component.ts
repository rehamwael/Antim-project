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

  constructor(public router: Router,
    private modalService: NgbModal,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private userProfileService: ProfileService,
    private toastr: ToastrService,
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;

  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.currentUser = state.userProfile;
      // console.log(this.currentUser);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    console.log(this.currentUser);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');

  }
  deleteAccount() {
    this.userId = this.currentUser.id;
    console.log(this.userId);
    this.spinner.show();
    this.userProfileService.deleteUser(this.userId).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
    }, err => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  deActivateAccount() {
    this.userId = this.currentUser.id;
    console.log(this.userId);
    this.spinner.show();
    this.userProfileService.deActivateUser(this.userId).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
    }, err => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: false });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  logOut() {
    this.store.dispatch(new Logout);
  }

}


