import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerRequestService } from '../services/customer-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-request-details',
  templateUrl: './customer-request-details.component.html',
  styleUrls: ['./customer-request-details.component.css']
})
export class CustomerRequestDetailsComponent implements OnInit {

  productName: any;
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
  totalProducts: any;

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
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }


  ngOnInit(): void {
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
      if (this.requestType_ENUM === 1) {
        this.requestType = 'AWaiting for Fund';
      }
      if (this.requestType_ENUM === 2) {
        this.requestType = 'Closed';
        this.deleteButton = true;
      }
      if (this.requestType_ENUM === 3) {
        this.requestType = 'Rejected';
      }
      if (this.requestType_ENUM === 4) {
        this.requestType = 'Ongoing';
      }
      if (this.requestType_ENUM === 5) {
        this.requestType = 'Draft';
        this.deleteButton = true;
        this.showEditButton = true;
      }
      if (this.requestType_ENUM === 6) {
        this.requestType = 'Accepted';
      }
      this.spinner.hide();

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
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  openDeletePopup(content) {
    this.modalService.open(content, { centered: true });
  }

  deleteRequest() {
    this.spinner.show();
    this.customerRequestService.deleteCustomerRequest(this.requestID).subscribe(res => {
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
      this.router.navigate(['/requests-customer']);
    }, err => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.showErrorToast('Error!!', err.message, 'error');
    });
  }


  editRequestInfo() {
    this.editDraftRequest = true;
    this.showRequestDetiails = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
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
    if (this.totalPrice <= 500 || this.totalPrice >= 10000) {
      this.disableFirstStep = false;
      this.showTotalPrice = false;
      this.totalPrice = 0;
      // tslint:disable-next-line: max-line-length
      this.showErrorToast('Error!!', 'Total Product Price must be greater than 500 and less than 10000,Go back and Enter correct price.', 'error');
    } else {
      this.showTotalPrice = true;
      this.disableFirstStep = true;
    }
  }
  nextStep() {
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
    this.monthlyInstallment = 0;
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
    this.spinner.show();
    this.customerRequestService.AddCustomerRequest({
      'Name': this.productName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      'MonthlyPaybackAmount': this.monthlyInstallment,
      'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 'Draft',
      'Products': this.productList
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
      'Name': this.productName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      'MonthlyPaybackAmount': this.monthlyInstallment,
      'TotalPaybackAmount': this.totalPriceWithProfit,
      'Type': 'Awaiting',
      'Products': this.productList
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

  addMoreItems() {
    this.productList.push({
      ProductUrl: '',
      Price: null
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
}
