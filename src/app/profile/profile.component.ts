import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit ,OnDestroy{
  disabledButton: boolean = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  isShown: boolean = false ; // hidden by default
  disabledBankButton: boolean = true;



  constructor(private fb: FormBuilder) { 
    this.EditForm = fb.group({
      'Name': ['',{disabled:true}],
      'MobileNo': ['',{disabled:true}],
      'Email': ['',{disabled:true}],
      'NID': ['',{disabled:true}],
      'Address': ['',{disabled:true}]
      });

      this.BankInfoForm = fb.group({
        'BankName': [''],
        'BankAccount': [''],
        'EmailAdd': [''],
        'Iqama': [''],
        });

  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');

  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('profile');

  }
  EditInfo(){
    this.disabledButton = false;
  }
  SaveInfo(){
    this.disabledButton = true;
  }
  EditBankInfo(){
    this.disabledBankButton = false;
  }
  SaveBankInfo(){
    this.disabledBankButton = true;
  }
  onChange(deviceValue) {
      if(deviceValue == "Bank"){
        this.isShown = ! this.isShown;
      }else{
        this.isShown = ! this.isShown;
      }
  }
}
