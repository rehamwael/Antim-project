import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  PasswordForm: FormGroup;
  password: any;
  confirmPassword: any;
  options: IndividualConfig;
  disabledSubmitButton = true;
  @HostListener('input') oninput() {
    if (this.PasswordForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}

  constructor(private fb: FormBuilder,
    private RPservice: ResetPasswordService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-top-right';
      this.options.timeOut = 6000;
      this.options.progressBar = true;

    this.PasswordForm = fb.group({
      'password': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^.*(?=.{9,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$')
      ])],
      'confirmPassword': [null, Validators.compose([
        Validators.required,
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
  ResetPassword() {
    this.spinner.show();
    this.RPservice.resetPassword({
      'userId': '',
      'code': 'this.email',
      'newPassword': ''
      }).subscribe(  async (res) => {
          this.spinner.hide();
          // this.showSuccessToast('OK!!', res, 'success');
      }, err => {
        this.spinner.hide();
          if (err) {
            // this.showErrorToast('Error!!', err.error, 'error');
          }
      });
  }

}