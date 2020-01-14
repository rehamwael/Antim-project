import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerRequestService } from '../services/customer-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState, customerState, selectAuthenticationState } from './../store/app.states';
import { EditCustomerRequest, DeleteCustomerRequests, DeleteDraftRequest, IsUpdatedFalse } from './../store/actions/customer.actions';
import { Observable } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material';
import { ProfileService } from '../services/userProfile.service';

let InstallmentDetails: any[] = [];

@Component({
  selector: 'app-customer-request-details',
  templateUrl: './customer-request-details.component.html',
  styleUrls: ['./customer-request-details.component.css']
})
export class CustomerRequestDetailsComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: ElementRef;
  displayedColumns: string[] = ['months', 'dueDate', 'price', 'status'];
  dataSource = new MatTableDataSource<any>(InstallmentDetails);
  monthlyInstallmentsData: any;

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

  showTable = false;
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
  showRequestDetails = true;
  hideTotalButton = false;
  showCancelButton = false;
  showRequestDetailsTable = false;

  totalProducts: any;
  getState: Observable<any>;
  content: any;
  checkIsUpdated = false;
  requestDetails: any;

  productList: any[] = [{
    productUrl: '',
    amount: null
  }];
  productStatus: any;
  requestTypes: any[] = [
    {
      type: 'All Requests'
    },
    {
      type: 'Awaiting For Fund Requests'
    },
    {
      type: 'Closed Requests'
    },
    {
      type: 'Rejected Requests'
    },
    {
      type: 'Ongoing Requests'
    },
    {
      type: 'Draft Requests'
    },
    {
      type: 'Under Review Requests'
    }
  ];
  installmentTypes: any[] = [
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
  ProductStatus: any[] = [
    {
      type: 'Pending (Products Not Purchased Yet).'
    },
    {
      type: 'Products Purchased.'
    },
    {
      type: 'Products Delivered to Customer.'
    },
    {
      type: 'Products Recieved by Customer.'
    }
  ];
  amountStatus: any[] = [
    {
      type: 'Unpaid'
    },
    {
      type: 'Paid'
    },
  ];
  getUserState: Observable<any>;
  currentUser: any;
  showAlert = false;
  disableButton = false;
  priceWithDelivery: number;
  deliveryFee: number;
  isdelivered = false;

  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private profileService: ProfileService,
  ) {
    this.getUserState = this.store.select(selectAuthenticationState);
    this.getState = this.store.select(customerState);

    this.route.paramMap.subscribe(params => {
      this.requestID = params.get('id');
    });
    this.getUserState.subscribe((state) => {
      this.currentUser = state.userProfile;
    });

  }

  getCustomerRequestDetails() {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this.customerRequestService.getRequestDataById(this.requestID).subscribe(res => {
        this.requestDetails = res.result;
        this.productList = res.result.customerRequestProducts.slice();
        console.log('REQUEST DETAILS: ', res.result);
        this.requestDate = moment(res.result.createdAt).format('LL');
        this.monthlyInstallment = res.result.monthlyPaybackAmount;
        this.requestName = res.result.name;
        this.totalPrice = res.result.totalFundAmount;
        this.totalPriceWithProfit = res.result.totalPaybackAmount;
        this.installmentPeriod_ENUM = res.result.paybackPeriod;
        // if (this.installmentPeriod_ENUM === 1) {
        //   this.installmentPeriod = '3-Months';
        // }
        // if (this.installmentPeriod_ENUM === 2) {
        //   this.installmentPeriod = '6-Months';
        // }
        // if (this.installmentPeriod_ENUM === 3) {
        //   this.installmentPeriod = '9-Months';
        // }
        // if (this.installmentPeriod_ENUM === 4) {
        //   this.installmentPeriod = '12-Months';
        // }
        this.installmentPeriod = this.installmentTypes[res.result.paybackPeriod].type;
        this.requestType_ENUM = res.result.type;
        this.requestType = this.requestTypes[res.result.type].type;
        if (res.result.type == 4 || res.result.type == 2) {
          this.showRequestDetailsTable = true;
        }
        // if (this.requestType_ENUM == 1) {
        //   this.showCancelButton = true;
        // }
        if (this.requestType_ENUM == 5) {
          this.deleteButton = true;
          this.showEditButton = true;
        }
        if (this.requestType_ENUM == 6) {
          this.showCancelButton = true;
        }
        this.productStatus = this.ProductStatus[res.result.productStatus].type;
        this.spinner.hide();
        localStorage.setItem('customerRequestType', this.requestType);

        resolve(res);
      });
    });
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      console.log('check store', state);
      this.checkIsUpdated = state.isUpdated;
      if (this.checkIsUpdated == true) {
        this.modalService.open(this.content, { centered: false });
      }
    });
    this.showRequestDetails = true;
    this.getCustomerRequestDetails().then(e => {
      if (this.requestDetails.productStatus == 3) {
        this.showTable = true;
        this.spinner.show();
        this.customerRequestService.getRequestInstallmentDetails(this.requestID).subscribe(res => {
          console.log(res);
          this.monthlyInstallmentsData = res.result.customerInstallments;
          InstallmentDetails.length = 0;
          let i = 1;
          this.monthlyInstallmentsData.forEach(element => {
            InstallmentDetails.push(element);
            element.month = i;
            element.date = moment(element.dueDate).format('LL');
            element.price = element.amount + ' SAR';
            element.status = this.amountStatus[element.status].type;
            if (element.status == 'Paid') {
            }
            i++;
          });
          this.dataSource = new MatTableDataSource<any>(InstallmentDetails);
          console.log('InstallmentDetails:', InstallmentDetails);
          this.spinner.hide();
        });
      } else {
        this.showTable = false;
      }
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
    this.customerRequestService.getConfigData('deliveryFees').subscribe(res => {
      this.deliveryFee = res.result.value;
    }, err => {
      console.log(err);
    });

  }

  closeModal() {
    this.checkIsUpdated = false;
    this.modalService.dismissAll();
    this.store.dispatch(new IsUpdatedFalse());
    this.content = '';
  }

  openDeletePopup(content) {
    this.modalService.open(content, { centered: false });
  }
  OpenCancelRequestPopup(content) {
    this.modalService.open(content, { centered: false });
  }

  deleteRequest() {
    const actionPayload = {
      id: this.requestID
    };
    this.store.dispatch(new DeleteDraftRequest(actionPayload));
  }

  editRequestInfo() {
    this.disableFirstStep = true;
    this.editDraftRequest = true;
    this.showRequestDetails = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: false });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

  nextStep(stepper: MatStepper) {
    this.totalPrice = 0;
    this.totalPriceWithProfit = 0;
    this.productList.map(product => {
      this.totalPrice = 1 * this.totalPrice + 1 * product.amount;
    });
    console.log('totalPrice:', this.totalPrice);
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
      this.totalPrice = 0;
      this.profileService.showErrorToastr('Total Price of Products must be greater than 500 and less than 10000. | يجب أن يكون إجمالي سعر المنتجات أكبر من 500 وأقل من 10000');
    } else {
      console.log(stepper);
      stepper.next();
    }
    this.totalProducts = Object.keys(this.productList).length;
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
    this.priceWithDelivery = this.totalPriceWithProfit;
  }
  onFocusoutMethod() {
    this.totalPrice = 0;
    this.productList.map(product => {
      this.totalPrice = 1 * this.totalPrice + 1 * product.amount;
    });
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
  }


  saveAsDraft(content) {
    this.content = content;
    const actionPayload = {
      'Id': this.requestID,
      'Name': this.requestName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      // 'MonthlyPaybackAmount': this.monthlyInstallment,
      'TotalPaybackAmount': this.priceWithDelivery,
      'Type': 5,
      'Products': this.productList,
      'isDelieveryFees': this.isdelivered
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
      'TotalPaybackAmount': this.priceWithDelivery,
      'Type': 6,
      'Products': this.productList,
      'isDelieveryFees': this.isdelivered
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
  ShowAlert() {
    this.isdelivered = true;
    this.showAlert = true;
    this.disableButton = true;
    this.priceWithDelivery = 1 * this.totalPriceWithProfit + 1 * this.deliveryFee;
  }
  HideAlert() {
    this.isdelivered = false;
    this.showAlert = false;
    this.disableButton = true;
    if (this.priceWithDelivery == this.totalPriceWithProfit) {
      this.priceWithDelivery = this.totalPriceWithProfit;
    } else {
      this.priceWithDelivery = 1 * this.priceWithDelivery - 1 * this.deliveryFee;
    }
  }

}
