import { Component, OnInit ,OnDestroy ,HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit ,OnDestroy{
  LoginForm: FormGroup;
  disabledSubmitButton: boolean = true;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private fb: FormBuilder ) { 
    this.LoginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      });
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }


}
