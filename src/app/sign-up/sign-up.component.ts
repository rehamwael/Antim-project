import { Component, OnInit ,OnDestroy, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
  public selectedItem: any;
  disabledNextButton: boolean = true;
  showSelected: boolean;
  sheckMobileStep: boolean;
  lastStep: boolean;
  disabledSubmitButton: boolean = true;
  SigUpForm: FormGroup;
  userType: any;
  dashboredUrl: any;
  public id;
  

  @HostListener('input') oninput() {
    if (this.SigUpForm.valid) {
      this.disabledSubmitButton = false;
      }
  }

  constructor(private fb: FormBuilder) { 
    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep= false;

    this.SigUpForm = fb.group({
      'FirstName': ['', Validators.required],
      'NID': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.required],
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
  addClass(id: any) {
    this.id = id;
    if(this.id == "1"){
      this.userType = "lender"
    }else{
      this.userType = "borrower"
    }
    this.dashboredUrl = "dashbored-" + this.userType;
    if(this.disabledNextButton){
      this.disabledNextButton = false;
    }
  }

  Nextstep(){
    this.showSelected = !this.showSelected;
  }
  PrevStep(){
    this.showSelected = !this.showSelected;

  }
  thirdStep(){
    this.sheckMobileStep = !this.sheckMobileStep;

  }
  lastStepd(){
    this.lastStep = !this.lastStep;
  }
  closeBack(){
    this.showSelected = false;
    this.sheckMobileStep = false;
  }
  closeBackLast(){
    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep = false;
  }
  keytab(event){
    let element = event.srcElement.nextElementSibling; // get the sibling element

    if(element == null)  // check if its null
        return;
    else
        element.focus();   // focus if not null
   }

}
