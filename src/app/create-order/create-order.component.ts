import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { CustomerRequestService } from '../services/customer-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthenticationState, customerState } from './../store/app.states';
import { UserProfile } from './../store/actions/auth.actions';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { AddCustomerRequest, IsUpdatedFalse } from '../store/actions/customer.actions';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})


export class CreateOrderComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  getUserState: Observable<any>;
  getCustomerState: Observable<any>;
  currentUser: any;
  checkIsUpdated = false;
  requestName: any;
  totalPrice: number;
  monthlyPrice: number;
  totalPriceWithProfit: number;
  showOptions = false;
  installmentPeriod: any;
  installmentPeriod_ENUM: number;
  totalProducts: any;
  requestType: any;
  disabledAgreement = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;
  disabledSubmitButton = true;
  disabledSubmitButtonSecond = false;
  options: IndividualConfig;
  content: any;
  userPoductList: any[] = [{
    productUrl: '',
    amount: 0
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
    this.getCustomerState = this.store.select(customerState);
    this.getUserState = this.store.select(selectAuthenticationState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 7000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  ngOnInit(): void {
    this.getUserState.subscribe((state) => {
      this.currentUser = state.userProfile;
    });
    this.getCustomerState.subscribe((state) => {
      console.log('check store', state);
      this.checkIsUpdated = state.isUpdated;
      if (this.checkIsUpdated == true) {
        this.modalService.open(this.content, { centered: false });
      }
    });

    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);

    this.firstFormGroup = this._formBuilder.group({
      Name: [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
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

  nextStep() {
    this.totalPrice = 0;
    this.userPoductList.map(product => {
      this.totalPrice = 1 * this.totalPrice + 1 * product.amount;
    });
    console.log('totalPrice:', this.totalPrice);
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
      this.totalPrice = 0;
      this.showErrorToast('Error!!', 'Total Price of Products must be greater than 500 and less than 10000.', 'error');
    } else {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }
    this.totalProducts = Object.keys(this.userPoductList).length;
    if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
      this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 25) / 100);
      this.totalPriceWithProfit = Math.round(this.totalPriceWithProfit);
      this.showOptions = false;
      console.log('totalPriceWithProfit :', this.totalPriceWithProfit);
    }
    if (this.totalPrice > 5000 && this.totalPrice <= 10000) {
      this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 15) / 100);
      this.totalPriceWithProfit = Math.round(this.totalPriceWithProfit);
      this.showOptions = true;
      console.log('totalPriceWithProfit :', this.totalPriceWithProfit);
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
  saveAsDraft(content) {
    this.content = content;
    const actionPayload = {
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      // 'MonthlyPaybackAmount': this.monthlyPrice,
      // 'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 5,
      'Products': this.userPoductList
    };
    this.store.dispatch(new AddCustomerRequest(actionPayload));
  }
  closeModal() {
    this.checkIsUpdated = false;
    this.modalService.dismissAll();
    this.store.dispatch(new IsUpdatedFalse());
    this.content = '';
  }

  saveRequest(content3) {
    this.content = content3;
    const actionPayload = {
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      // 'MonthlyPaybackAmount': this.monthlyPrice,
      // 'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 6,
      'Products': this.userPoductList
    };
    this.store.dispatch(new AddCustomerRequest(actionPayload));
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

  onFocusoutMethod() {
    this.totalPrice = 0;
    this.userPoductList.map(product => {
      this.totalPrice = 1 * this.totalPrice + 1 * product.amount;
    });
   }

  addMoreItems() {
    this.userPoductList.push({
      productUrl: '',
      amount: null
    });
  }
  removeItems(i: number) {
    this.userPoductList.splice(i, 1);
  }
  changeCheck(event) {
    if (event.target.checked) {
      this.disabledAgreement = true;
    } else {
      this.disabledAgreement = false;
    }
  }

}
