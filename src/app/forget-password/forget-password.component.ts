import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgetPasswordService } from './forget-password.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit  , OnDestroy {
  LoginForm: FormGroup;
  email: any;
  options: IndividualConfig;
  disabledSubmitButton = true;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private fb: FormBuilder,
    private FPservice: ForgetPasswordService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
      this.options = this.toastr.toastrConfig;
      this.options.positionClass = 'toast-top-right';
      this.options.timeOut = 6000;
      this.options.progressBar = true;

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
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
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
            this.spinner.hide();
            this.showSuccessToast('OK!!', res, 'success');
        }, err => {
          this.spinner.hide();
            if (err) {
              this.showErrorToast('Error!!', err.error, 'error');
            }
        });
    }
}
