import { Component, OnInit , OnDestroy , HostListener} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  isEditable = false;
  disabledSubmitButton = true;
  disabledSubmitButtonSecond = true;
  addMoreItem = false;


  @HostListener('input') oninput() {
    if (this.firstFormGroup.valid) {
      this.disabledSubmitButton = false;
      }
      if (this.secondFormGroup.valid) {
        this.disabledSubmitButtonSecond = false;
      }
  }

  constructor(public router: Router, private _formBuilder: FormBuilder , private modalService: NgbModal) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      link1: [''],
      link2: [''],
      link3: ['']

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstCtrl: ['6-Months-ex', Validators.required]
    });


    this.lastFormGroup = this._formBuilder.group({
      numberOfProduct: [{value: null, disabled: true}],
      TotalPrice: [{value: null, disabled: true}],
      InstallmentPeriod: [{value: null, disabled: true}],
      InstallmentPerMonth: [{value: null, disabled: true}],
      FinalProduct: [{value: null, disabled: true}]
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('dashbored-home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('dashbored-home');

  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  addMoreItems() {
    this.addMoreItem = true;
  }


}
