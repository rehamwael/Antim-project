import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { CustomerRequestService } from '../services/customer-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from './product';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit, OnDestroy {
  getState: Observable<any>;
  currentUser: any;
  disableButton = false;
  requestName: any;
  totalPrice = 0;
  monthlyPrice: number;
  totalPriceWithProfit: number;
  showOptions = false;
  installmentPeriod: any;
  installmentPeriod_ENUM: number;
  totalProducts: any;
  requestType: any;

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

  userPoductList: any[] = [{
    ProductUrl: '',
    Price: null
  }];

  @HostListener('input') oninput() {
    if (this.firstFormGroup.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(public router: Router,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAuthenticationState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      const token = localStorage.getItem('token');
      this.currentUser = state.userProfile;
      if (!this.currentUser && token) {
        this.store.dispatch(new UserProfile());
      }
    });
    // tslint:disable-next-line: max-line-length
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);

    this.firstFormGroup = this._formBuilder.group({
      Name: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      firstCtrl: ['', Validators.required]
    });


    this.lastFormGroup = this._formBuilder.group({
      numberOfProduct: [{ disabled: true }],
      TotalPrice: [{ disabled: true }],
      InstallmentPeriod: [{ disabled: true }],
      InstallmentPerMonth: [{ disabled: true }],
      FinalProduct: [{ disabled: true }]
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
  backButton() {
    this.totalPrice = 0;
    this.totalPriceWithProfit = 0;
  }
  nextStep() {
    console.log(this.userPoductList);
    this.userPoductList.map(product => {
      console.log(product.Price);
      console.log('totalPrice:', this.totalPrice);
      this.totalPrice = 1 * this.totalPrice + 1 * product.Price;
    });
    console.log('totalPrice:', this.totalPrice);
    if (this.totalPrice <= 500 || this.totalPrice >= 10000) {
      // tslint:disable-next-line: max-line-length
      this.showErrorToast('Error!!', 'Total Product Price must be greater than 500 and less than 10000,Go back and Enter correct price.', 'error');
    }
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
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
      this.disabledSubmitButtonSecond = false;
    }
  }
  saveAsDraft(content) {
    this.spinner.show();
    this.customerRequestService.AddCustomerRequest({
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      'MonthlyPaybackAmount': this.monthlyPrice,
      'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 'Draft',
      'Products': this.userPoductList
    }).subscribe((res) => {
      console.log('saveAsDraft:', res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.open(content, { centered: true });
    }, err => {
      console.log(' ERROR:', err);
      this.spinner.hide();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

  saveRequest(content3) {
    this.spinner.show();
    this.customerRequestService.AddCustomerRequest({
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      'MonthlyPaybackAmount': this.monthlyPrice,
      'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 'Awaiting',
      'Products': this.userPoductList
    }).subscribe((res) => {
      console.log(' Added:', res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.open(content3, { centered: true });
    }, err => {
      console.log(' ERROR:', err);
      this.spinner.hide();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }
  addMoreItems() {
    this.userPoductList.push({
      ProductUrl: '',
      Price: null
    });
  }
  removeItems(i: number) {
    this.userPoductList.splice(i, 1);
  }

}
