import { Component, OnInit ,OnDestroy ,HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit,OnDestroy{

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  isEditable = false;
  disabledSubmitButton: boolean = true;
  disabledSubmitButtonSecond: boolean = true;
  

  @HostListener('input') oninput() {
    if (this.firstFormGroup.valid) {
      this.disabledSubmitButton = false;
      }
      if(this.secondFormGroup.valid){
        this.disabledSubmitButtonSecond = false;
      }
  }
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      link1: ['', Validators.required],
      link2: ['', Validators.required],
      link3: ['', Validators.required]


    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstCtrl: ['', Validators.required]
    });


    this.lastFormGroup = this._formBuilder.group({
      numberOfProduct: [''],
      TotalPrice: [''],
      InstallmentPeriod: [''],
      InstallmentPerMonth: [''],
      FinalProduct: ['']
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');

  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
  }

}
