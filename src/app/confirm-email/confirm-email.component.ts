import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './../services/userProfile.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  code: any;
  userID: any;
  newEmail = '';
  showMessage = false;
  internalError = false;
  showConfirmMessage = false;

  constructor(
    private userEmailService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        this.code = queryParams.get('code');
        this.userID = queryParams.get('userId');
        this.newEmail = queryParams.get('email');
      });
  }
  ngOnInit() {
    console.log(this.newEmail);
    if (this.newEmail) {
      this.userEmailService.ConfirmNewEmail(
        this.newEmail,
        this.userID,
        this.code
      ).subscribe(async (res) => {
        this.showConfirmMessage = true;
        console.log('resultt: ', res);
        this.userEmailService.showSuccessToastr(res);
        this.showMessage = false;
      }, err => {
        this.showConfirmMessage = false;
        if (err.status == 500) {
          this.internalError = true;
          this.showMessage = false;
        } else {
          this.showMessage = true;
          this.internalError = false;
        }
        console.log('error: ', err);
        // this.showErrorToast('Error!!', err.error.message, 'error');
      });
    } else {
        this.userEmailService.confirmEmail(
          this.userID,
          this.code
        ).subscribe(async (res) => {
          this.showConfirmMessage = true;
          console.log('result: ', res);
          this.userEmailService.showSuccessToastr(res);
          this.showMessage = false;
        }, err => {
          this.showConfirmMessage = false;
          if (err.status == 500) {
            this.internalError = true;
            this.showMessage = false;
          }  else {
            this.showMessage = true;
            this.internalError = false;
          }
          console.log('error: ', err);
          // this.showErrorToast('Error!!', err.error.message, 'error');
        });
       }
  }
}
