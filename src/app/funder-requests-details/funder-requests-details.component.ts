



import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FunderRequestService } from '../services/funder-requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState, customerState } from './../store/app.states';
import { EditCustomerRequest, DeleteCustomerRequests, IsUpdatedFalse } from './../store/actions/customer.actions';
import { Observable } from 'rxjs';
import { CustomerRequestService } from '../services/customer-request.service';

@Component({
  selector: 'app-funder-requests-details',
  templateUrl: './funder-requests-details.component.html',
  styleUrls: ['./funder-requests-details.component.css']
})
export class FunderRequestsDetailsComponent implements OnInit {

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
  showFundButton = false;

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
    private funderRequestService: FunderRequestService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(customerState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;

    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
    });
    this.spinner.show();
    // this.funderRequestService.getRequestDataById(this.requestID).subscribe(res => {


    this.editRequestForm = this._formBuilder.group({
      ProductName: [''],
      RequestDate: [''],
      TotalAmount: [''],
      installmentPeriod: [''],
      MonthlyInstallment: [''],
      FundingAmount: [''],
      RequestStatus: [''],
    });

  }


  ngOnInit(): void {

    this.spinner.show();
    this.customerRequestService.getRequestDataById(this.requestID).subscribe(res => {
      this.showFundButton = true;
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
        this.requestType = 'Awaiting for Fund';
        this.showCancelButton = true;
      }
      if (this.requestType_ENUM == 2) {
        this.requestType = 'Closed';
        this.deleteButton = true;
      }
      if (this.requestType_ENUM == 3) {
        this.requestType = 'Rejected';
      }
      if (this.requestType_ENUM == 4) {
        this.requestType = 'Ongoing';
      }
      if (this.requestType_ENUM == 5) {
        this.requestType = 'Draft';
        this.deleteButton = true;
        this.showEditButton = true;
      }
      if (this.requestType_ENUM == 6) {
        this.requestType = 'Accepted';
        this.showCancelButton = true;
      }
      if (this.requestType_ENUM == 7) {
        this.requestType = 'Under Review';
        this.showCancelButton = true;
      }
      this.spinner.hide();
      localStorage.setItem('requestType', this.requestType);
    });

  }

  makeFund() {
    this.funderRequestService.addFunderRequest({
      'CustomerRequestId': this.requestID
    }).subscribe(res => {
    console.log(res);
    this.showSuccessToast('OK!!', res.message, 'success');
  }, err => {
    console.log(err);
    });

  }
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



  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: false });
    // this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
}
