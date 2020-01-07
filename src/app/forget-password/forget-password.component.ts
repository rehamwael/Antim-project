import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserEmailPasswordService } from '../services/user-EmailPassword.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit  , OnDestroy {
  LoginForm: FormGroup;
  email: any;
  disabledSubmitButton = true;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(
    private fb: FormBuilder,
    private FPservice: UserEmailPasswordService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
    ) {

      this.LoginForm = fb.group({
        'email': [null, Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
        ])],
        });
    }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  sendEmail() {
      this.spinner.show();
      this.FPservice.sendEmailToUser({
        'Email': this.email
        }).subscribe(  async (res) => {
          console.log('res', res.message);
          this.spinner.hide();
          this.profileService.showSuccessToastr(res);
        }, err => {
          this.spinner.hide();
            if (err) {
              this.profileService.showErrorToastr(err.error.message);
            }
        });
    }
}
