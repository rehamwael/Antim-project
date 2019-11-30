import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  disableButton1 = false;
  disableButton2 = true;
  disableButton3 = true;
  Link1: any;
  Link2: any;
  Link3: any;
  name1: any;
  name2: any;
  name3: any;
  // Link4: any;
  price1: number;
  price2: number;
  price3: number;
  // price4: number;
  totalPrice: number;
  monthlyPrice: number;
  totalPriceWithProfit: number;
  showOptions = false;
  installmentPeriod: any;
  installmentPeriod_ENUM: number;
  totalProducts: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  isEditable = false;
  disabledSubmitButton = true;
  disabledSubmitButtonSecond = false;
  addMoreItem = false;
  addSecondItem = false;
  addThirdItem = false;
  options: IndividualConfig;


  @HostListener('input') oninput() {
    if (this.firstFormGroup.valid) {
      this.disabledSubmitButton = false;
    }
    // if (this.secondFormGroup.valid) {
    //   this.disabledSubmitButtonSecond = false;
    // }
  }

  constructor(public router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-bottom-right';
    this.options.timeOut = 5000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      link1: [null, Validators.compose([
        Validators.required
      ])],
      link2: [''],
      link3: [''],
      Name1: [null, Validators.compose([
        Validators.required
      ])],
      Name2: [''],
      Name3: [''],
      Price1: [null, Validators.compose([
        Validators.required
      ])],
      Price2: [''],
      Price3: [''],

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstCtrl: ['', Validators.required]
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
    if (this.Link1) {
      this.totalProducts = 1;
    }
    if (this.Link1 && this.Link2) {
      this.totalProducts = 2;
    }
    if (this.Link1 && this.Link2 && this.Link3) {
      this.totalProducts = 3;
    }

    if (!this.price2) {
      this.price2 = 0;
    }
    if (!this.price3) {
      this.price3 = 0;
    }
    this.totalPrice =  this.price1 + this.price2 + this.price3;
    console.log('totalPrice:', this.totalPrice);
    if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
      this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 25) / 100);
      this.showOptions = false;
      console.log('totalPriceWithProfit:', this.totalPriceWithProfit);
    } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
      this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 15) / 100);
      this.showOptions = true;
      console.log('totalPriceWithProfit:', this.totalPriceWithProfit);
    }
  }

  onChange(Value) {
    if (Value === '3-Months') {
      this.installmentPeriod = '3-Months';
      this.installmentPeriod_ENUM = 1;
      this.monthlyPrice = this.totalPriceWithProfit / 3;
      this.monthlyPrice = Math.round(this.monthlyPrice);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '6-Months') {
      this.installmentPeriod = '6-Months';
      this.installmentPeriod_ENUM = 2;
      this.monthlyPrice = this.totalPriceWithProfit / 6;
      this.monthlyPrice = Math.round(this.monthlyPrice);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '9-Months') {
      this.installmentPeriod = '9-Months';
      this.installmentPeriod_ENUM = 3;
      this.monthlyPrice = this.totalPriceWithProfit / 9;
      this.monthlyPrice = Math.round(this.monthlyPrice);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '12-Months') {
      this.installmentPeriod = '12-Months';
      this.installmentPeriod_ENUM = 4;
      this.monthlyPrice = this.totalPriceWithProfit / 12;
      this.monthlyPrice = Math.round(this.monthlyPrice);
      this.disabledSubmitButtonSecond = true;
    }
  }


  inputPrice1(event) {
    // tslint:disable-next-line: prefer-const
    let price = event.target.value;
    if (price >= 200 && price <= 10000) {
      this.disableButton1 = true;
    } else {
      this.disableButton1 = false;
    }
  }
  inputPrice2(event) {
    // tslint:disable-next-line: prefer-const
    let price = event.target.value;
    if (price >= 200 && price <= 10000) {
      this.disableButton2 = true;
    } else {
      this.disableButton2 = false;
    }
    if (price === '') {
      this.disableButton2 = true;
    }
  }
  inputPrice3(event) {
    if (this.price2 === null ) {
      this.disableButton3 = true;
    } else {
      this.disableButton3 = false;
    }
    // tslint:disable-next-line: prefer-const
    let price = event.target.value;
    if (price >= 200 && price <= 10000) {
      this.disableButton3 = true;
    } else {
      this.disableButton3 = false;
    }
    if (price === '') {
      this.disableButton3 = true;
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
