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
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router) {
    this.LoginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
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
  login() {
    console.log('inlogin.');
    this.authservice.login().subscribe( (res) => {
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
