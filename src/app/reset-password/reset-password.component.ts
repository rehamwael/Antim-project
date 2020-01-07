import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  PasswordForm: FormGroup;
  password: any;
  confirmPassword: any;
  token: any;
  userID: any;
  disabledSubmitButton = true;

  @HostListener('input') oninput() {
    if (this.PasswordForm.valid) {
      this.disabledSubmitButton = false;
      }
  }

  constructor(
    private fb: FormBuilder,
    private RPservice: UserEmailPasswordService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    ) {

    this.PasswordForm = fb.group({
      'password': ['', [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      'confirmPassword': ['', [ Validators.required ] ],
      });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.token = queryParams.get('code');
      this.userID = queryParams.get('userId');
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  ResetPassword() {
    if (this.password !== this.confirmPassword) {
      this.profileService.showErrorToastr('Password Must Match | كلمة المرور يجب ان تتطابق');
    } else {
    this.spinner.show();
    this.RPservice.resetPassword({
      'userId': this.userID,
      'code': this.token,
      'newPassword': this.password
      }).subscribe(  async (res) => {
        console.log('res', res);
          this.spinner.hide();
          this.router.navigateByUrl('/login');
          this.profileService.showSuccessToastr(res);
        }, err => {
        console.log('err', err);
        this.spinner.hide();
          if (err.error.message) {
            this.profileService.showErrorToastr(err.error.message);
          }
      });
    }
  }

}
