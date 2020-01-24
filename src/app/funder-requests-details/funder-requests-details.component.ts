import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FunderRequestService } from '../services/funder-requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.states';
import { Observable } from 'rxjs';
import { CustomerRequestService } from '../services/customer-request.service';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-funder-requests-details',
  templateUrl: './funder-requests-details.component.html',
  styleUrls: ['./funder-requests-details.component.css']
})
export class FunderRequestsDetailsComponent implements OnInit {

  requestDetails: any;
  requestName: any;
  requestID: any;
  requestType_ENUM: any;
  requestType: any;
  totalPrice: number;
  totalPriceWithProfit: number;
  totalProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  installmentPeriod_ENUM: any;
  requestDate: any;
  editRequestForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  lastFormGroup: FormGroup;

  editDraftRequest = false;
  disabledAgreement = false;
  disableFirstStep = false;
  showOptions: boolean;
  // isLinear = true;
  showTotalPrice = false;
  addMoreItem = false;
  disabledSubmitButtonSecond = false;
  disabledSubmitButton = true;
  hideTotalButton = false;

  totalProducts: any;
  getState: Observable<any>;
  content: any;
  checkIsUpdated = false;

  productList: any[] = [{
    productUrl: '',
    amount: null
  }];
  installmentMonths: any[] = [
    {
      type: 'Null'
    },
    {
      type: '3 Months'
    },
    {
      type: '6 Months'
    },
    {
      type: '9 Months'
    },
    {
      type: '12 Months'
    }
  ];


  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private funderRequestService: FunderRequestService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {

    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
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

  }


  ngOnInit(): void {

    this.spinner.show();
    this.customerRequestService.getRequestDataById(this.requestID).subscribe(res => {
      this.productList = res.result.customerRequestProducts.slice();
      console.log('REQUEST DETAILS: ', res.result);
      this.requestDetails = res.result;
      this.requestDate = moment(res.result.createdAt).format('LL');
      // this.monthlyInstallment = res.result.monthlyPaybackAmount;
      this.requestName = res.result.name;
      this.totalPrice = res.result.totalFundAmount;
      this.totalPriceWithProfit = res.result.totalPaybackAmount;
      this.totalProfit = this.totalPriceWithProfit - this.totalPrice;
      this.totalProfit = Math.round((this.totalProfit * 80) / 100);
      this.installmentPeriod_ENUM = res.result.paybackPeriod;
      this.installmentPeriod = this.installmentMonths[res.result.paybackPeriod].type;
      this.monthlyInstallment = Math.round((this.totalProfit + this.totalPrice) / (res.result.paybackPeriod * 3));
      this.requestType_ENUM = res.result.type;
      if (this.requestType_ENUM == 1) {
        this.requestType = 'Awaiting For Fund Requests';
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }
  OpenPopUp(content) {
    this.modalService.open(content, { centered: false });
  }
  makeFund() {
    this.spinner.show();
    this.funderRequestService.addFunderRequest({
      'CustomerRequestId': this.requestID
    }).subscribe(res => {
      this.modalService.dismissAll();
      localStorage.setItem('selectedFunderRequestType', 'All Requests');
      this.profileService.showSuccessToastr(res);
      this.router.navigateByUrl('/requests-funder');
      this.spinner.hide();
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.modalService.dismissAll();
      this.profileService.showErrorToastr(err.error.message);
    });
  }

  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

}
