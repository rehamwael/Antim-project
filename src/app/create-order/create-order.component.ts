import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  disableButton = false;
  Link1: any;
  Link2: any;
  Link3: any;
  Link4: any;
  price: any;
  price1: any;
  price2: any;
  price3: any;
  price4: any;
  totalPrice: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  isEditable = false;
  disabledSubmitButton = true;
  disabledSubmitButtonSecond = true;
  addMoreItem = false;
  addSecondItem = false;
  addThirdItem = false;


  @HostListener('input') oninput() {
    if (this.firstFormGroup.valid) {
      this.disabledSubmitButton = false;
    }
    if (this.secondFormGroup.valid) {
      this.disabledSubmitButtonSecond = false;
    }
  }

  constructor(public router: Router, private _formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      link1: [null, Validators.compose([
        Validators.required
      ])],
      link2: [''],
      link3: [''],
      link4: [''],
      Price1: [null, Validators.compose([
        Validators.required
      ])],
      Price2: [''],
      Price3: [''],
      Price4: ['']

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstCtrl: ['6-Months-ex', Validators.required]
    });


    this.lastFormGroup = this._formBuilder.group({
      numberOfProduct: [{ value: null, disabled: true }],
      TotalPrice: [{ value: null, disabled: true }],
      InstallmentPeriod: [{ value: null, disabled: true }],
      InstallmentPerMonth: [{ value: null, disabled: true }],
      FinalProduct: [{ value: null, disabled: true }]
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
  nextStep() {
    this.totalPrice = this.price1 + this.price2 + this.price3 + this.price4 ;
    console.log(this.totalPrice);
  }

  inputPrice(event) {
    this.price = event.target.value;
    if (this.price >= 200 && this.price <= 10000) {
    this.disableButton = true;
    } else {
      this.disableButton = false;
    }
  }
  inputPrices(event) {
    this.disableButton = true;
    if (this.price2 === null && this.price3 === null && this.price4 === null) {
      this.disableButton = true;
    }
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  addMoreItems() {
    if (this.price1 != null) {
      this.addSecondItem = true;
    }
    if (this.price1 != null && this.price2 != null) {
    this.addThirdItem = true;
    }
  }

}
