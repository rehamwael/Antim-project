import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerRequestService } from '../services/customer-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState, customerState } from './../store/app.states';
import { EditCustomerRequest, DeleteCustomerRequests, IsUpdatedFalse } from './../store/actions/customer.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-request-details',
  templateUrl: './customer-request-details.component.html',
  styleUrls: ['./customer-request-details.component.css']
})
export class CustomerRequestDetailsComponent implements OnInit {

  requestName: any;
  requestID: any;
  requestType_ENUM: any;
  requestType: any;
  totalPrice: number;
  totalPriceWithProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  installmentPeriod_ENUM: any;
  requestDate: any;
  editRequestForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;

  showEditButton = false;
  deleteButton = false;
  editDraftRequest = false;
  disabledAgreement = false;
  disableFirstStep = false;
  showOptions: boolean;
  // isLinear = true;
  showTotalPrice = false;
  addMoreItem = false;
  disabledSubmitButtonSecond = false;
  disabledSubmitButton = true;
  showRequestDetiails = true;
  hideTotalButton = false;
  showCancelButton = false;

  totalProducts: any;
  getState: Observable<any>;
  content: any;
  checkIsUpdated = false;

  options: IndividualConfig;
  productList: any[] = [{
    productUrl: '',
    amount: null
  }];


  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(customerState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }


  ngOnInit(): void {
    this.getState.subscribe((state) => {
      console.log('check store', state);
      this.checkIsUpdated = state.isUpdated;
      if (this.checkIsUpdated == true) {
        this.modalService.open(this.content, { centered: false });
      }
    });
    this.showRequestDetiails = true;
    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
    });
    this.spinner.show();
    this.customerRequestService.getRequestDataById(this.requestID).subscribe(res => {
      this.productList = res.result.customerRequestProducts.slice();
      console.log('REQUEST DETAILS: ', res.result);
      this.requestDate = moment(res.result.createdAt).format('LL');
      this.monthlyInstallment = res.result.monthlyPaybackAmount;
      this.requestName = res.result.name;
      this.totalPrice = res.result.totalFundAmount;
      this.totalPriceWithProfit = res.result.totalPaybackAmount;
      this.installmentPeriod_ENUM = res.result.paybackPeriod;
      if (this.installmentPeriod_ENUM === 1) {
        this.installmentPeriod = '3-Months';
      }
      if (this.installmentPeriod_ENUM === 2) {
        this.installmentPeriod = '6-Months';
      }
      if (this.installmentPeriod_ENUM === 3) {
        this.installmentPeriod = '9-Months';
      }
      if (this.installmentPeriod_ENUM === 4) {
        this.installmentPeriod = '12-Months';
      }
      this.requestType_ENUM = res.result.type;
      if (this.requestType_ENUM == 1) {
        this.requestType = 'Awaiting for Fund Requests';
        this.showCancelButton = true;
      }
      if (this.requestType_ENUM == 2) {
        this.requestType = 'Closed  Requests';
        this.deleteButton = true;
      }
      if (this.requestType_ENUM == 3) {
        this.requestType = 'Rejected Requests';
      }
      if (this.requestType_ENUM == 4) {
        this.requestType = 'Ongoing Requests';
      }
      if (this.requestType_ENUM == 5) {
        this.requestType = 'Draft Requests';
        this.deleteButton = true;
        this.showEditButton = true;
      }
      if (this.requestType_ENUM == 6) {
        this.requestType = 'Under Review Requests';
        this.showCancelButton = true;
      }
      this.spinner.hide();
      localStorage.setItem('customerRequestType', this.requestType);
    });
    this.editRequestForm = this._formBuilder.group({
      ProductName: [''],
      RequestDate: [''],
      TotalAmount: [''],
      installmentPeriod: [''],
      MonthlyInstallment: [''],
      FundingAmount: [''],
      RequestStatus: [''],
    });
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

  }
  // ngOnDestroy() {
  // console.log('heheh');
  // }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  closeModal() {
    this.checkIsUpdated = false;
    this.modalService.dismissAll();
    this.store.dispatch(new IsUpdatedFalse());
    this.content = '';
  }

  openDeletePopup(content) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { centered: false });
  }
  OpenCancelRequestPopup(content) {
    this.modalService.open(content, { centered: false });
  }

  deleteRequest() {
    const actionPayload = {
      id: this.requestID
    };
    this.store.dispatch(new DeleteCustomerRequests(actionPayload));
  }


  editRequestInfo() {
    this.disableFirstStep = true;
    this.editDraftRequest = true;
    this.showRequestDetiails = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: false });
    // this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  backButton() {
    this.totalPrice = 0;
    this.totalPriceWithProfit = 0;
  }
  calculateTotalPrice() {
    this.totalPrice = 0;
    this.productList.map(product => {
      this.totalPrice = 1 * this.totalPrice + 1 * product.amount;
    });
    console.log('totalPrice:', this.totalPrice);
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
      this.showErrorToast('Error!!', 'Total Product Price must be greater than 500 and less than 10000.', 'error');
      this.disableFirstStep = false;
      this.showTotalPrice = false;
      this.totalPrice = 0;
    } else {
      this.showTotalPrice = true;
      this.disableFirstStep = true;
    }
  }
  inputNumber() {
    this.totalPrice = 0;
    this.hideTotalButton = true;
    this.disableFirstStep = false;
    this.showTotalPrice = false;
  }
  nextStep() {
    this.monthlyInstallment = 0;
    this.totalProducts = Object.keys(this.productList).length;
    if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
      this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 25) / 100);
      this.totalPriceWithProfit = Math.round(this.totalPriceWithProfit);
      this.showOptions = false;
      console.log('totalPriceWithProfit :', this.totalPriceWithProfit);
    } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
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
      this.monthlyInstallment = this.totalPriceWithProfit / 3;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '6-Months') {
      this.installmentPeriod = '6-Months';
      this.installmentPeriod_ENUM = 2;
      this.monthlyInstallment = this.totalPriceWithProfit / 6;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '9-Months') {
      this.installmentPeriod = '9-Months';
      this.installmentPeriod_ENUM = 3;
      this.monthlyInstallment = this.totalPriceWithProfit / 9;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '12-Months') {
      this.installmentPeriod = '12-Months';
      this.installmentPeriod_ENUM = 4;
      this.monthlyInstallment = this.totalPriceWithProfit / 12;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
      this.disabledSubmitButtonSecond = false;
    }
  }


  saveAsDraft(content) {
    this.content = content;
    const actionPayload = {
      'Id': this.requestID,
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      // 'MonthlyPaybackAmount': this.monthlyInstallment,
      // 'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 5,
      'Products': this.productList
    };
    this.store.dispatch(new EditCustomerRequest(actionPayload));
  }

  saveRequest(content3) {
    this.content = content3;
    const actionPayload = {
      'Id': this.requestID,
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      // 'MonthlyPaybackAmount': this.monthlyInstallment,
      // 'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 6,
      'Products': this.productList
    };
    this.store.dispatch(new EditCustomerRequest(actionPayload));
  }

  addMoreItems() {
    this.productList.push({
      productUrl: '',
      amount: null
    });
  }
  removeItems(i: number) {
    this.productList.splice(i, 1);
  }
  changeCheck(event) {
    if (event.target.checked) {
      this.disabledAgreement = true;
    } else {
      this.disabledAgreement = false;
    }
  }
  cancelRequest() {
    const actionPayload = {
      id: this.requestID
    };
    this.store.dispatch(new DeleteCustomerRequests(actionPayload));
  }
}
