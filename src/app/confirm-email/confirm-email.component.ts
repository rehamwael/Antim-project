import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './../services/userProfile.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  token: any;
  userID: any;
  options: IndividualConfig;

  constructor(
    private userService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    ) {
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.token = queryParams.get('code');
        this.userID = queryParams.get('userId');
      });
      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-top-right';
      this.options.timeOut = 5000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}
showErrorToast(title, message, type) {
  this.toastr.show(message, title, this.options, 'toast-' + type);
}
  ngOnInit() {
    this.userService.confirmEmail(
      this.userID,
      this.token
    ).subscribe(async (res) => {
      console.log('result: ', res);
      this.showSuccessToast('OK!!', res.message, 'success');
    }, err => {
      console.log('error: ', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

}
