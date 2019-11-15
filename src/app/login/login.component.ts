import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit , OnDestroy {
  LoginForm: FormGroup;
  disabledSubmitButton = true;
  loginUsername: any;
  loginPassword: any;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) {
    this.LoginForm = fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
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
  login( Username: any, Password: any) {
    console.log('inlogin.', Username, Password);
    this.authservice.login({
      email: Username,
      password: Password
    }).subscribe( (res) => {
          console.log('Logged in!', res);
          this.router.navigate(['/dashbored-borrower']);
    }, async err => {
        console.log('Errrrrror : ', err);
    // if (err.error.status === 'fail') {
    //   const toast = this.toastCtrl.create({
    //     message: 'Incorrect email or password',
    //     duration: 3000,
    //     position: 'top',
    //     color: 'danger'
    //   });
    //   (await toast).present();
    // }
    });

  }
}
