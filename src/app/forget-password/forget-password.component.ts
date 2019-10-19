import { Component, OnInit ,OnDestroy ,HostListener} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit  ,OnDestroy{
  LoginForm: FormGroup;
  disabledSubmitButton: boolean = true;
  @HostListener('input') oninput() {
    if (this.LoginForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  constructor(private fb: FormBuilder ) { 
    this.LoginForm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
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



