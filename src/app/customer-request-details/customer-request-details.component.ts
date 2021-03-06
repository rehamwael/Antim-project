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
import { TranslateService } from '@ngx-translate/core';

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
  requestType: any;
  totalPrice: number;
  totalPriceWithProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  ARinstallmentPeriod: any;
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
  ENtotalProducts: any;
  ARtotalProducts: any;
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
      type: 'Awaiting For Fund Requests',
      arType: 'الطلبات بإنتظار تمويل'
    },
    {
      type: 'Closed Requests',
      arType: 'الطلبات المغلقة'
    },
    {
      type: 'Rejected Requests',
      arType: 'الطلبات المرفوضة'
    },
    {
      type: 'Ongoing Requests',
      arType: 'الطلبات الجارية'
    },
    {
      type: 'Draft Requests',
      arType: 'الطلبات المسودة'

    },
    {
      type: 'Under Review Requests',
      arType: 'الطلبات تحت المراجعة'
    }
  ];
  installmentTypes: any[] = [
    {
      type: 'Null'
    },
    {
      type: '3 Months',
      arType: '3 اشهر'
    },
    {
      type: '6 Months',
      arType: '6 اشهر'
    },
    {
      type: '9 Months',
      arType: '9 اشهر'
    },
    {
      type: '12 Months',
      arType: '12 اشهر'
    }
  ];
  ProductStatus: any[] = [
    {
      type: 'Pending (Products Not Purchased Yet)',
      arType: 'في انتظار (منتجات لم يتم شراؤها بعد)'
    },
    {
      type: 'Products Purchased',
      arType: 'تم شراء المنتجات'
    },
    {
      type: 'Products Delivered to Customer',
      arType: 'جاري توصيل المنتجات'
    },
    {
      type: 'Products Recieved by Customer',
      arType: 'تم إستلام المنتجات من قبل العميل'
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
  deliveryFees: number;
  isdeliveryFees: boolean;
  isdelivered = false;
  userLang: any;
  arProductStatus: any;
  arRequestType: any;
  arInstallmentPeriod: any;
  arRequestDate: any;
  enumRequestTypes: any[] = [];

  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private profileService: ProfileService,
    public translate: TranslateService,
  ) {
    let enumValues = JSON.parse(localStorage.getItem('EnumConfigs'));
    this.enumRequestTypes = enumValues.requestType;

    this.getUserState = this.store.select(selectAuthenticationState);
    this.getState = this.store.select(customerState);
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });

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
        this.isdeliveryFees = res.result.isDelieveryFees;
        this.deliveryFees = res.result.delieveryFees;
        this.requestDate = moment(res.result.createdAt).format('LL');
        this.arRequestDate =  moment(res.result.createdAt).locale('ar-sa').format('LL');
        this.monthlyInstallment = res.result.monthlyPaybackAmount;
        this.requestName = res.result.name;
        this.totalPrice = res.result.totalFundAmount;
        this.totalPriceWithProfit = res.result.totalPaybackAmount;
        this.installmentPeriod_ENUM = res.result.paybackPeriod;
        this.installmentPeriod = this.installmentTypes[res.result.paybackPeriod].type;
        this.arInstallmentPeriod = this.installmentTypes[res.result.paybackPeriod].arType;
        // this.requestType = this.requestTypes[res.result.type].type;
        // this.arRequestType = this.requestTypes[res.result.type].arType;
        this.enumRequestTypes.map( element => {
          if ( element.key == res.result.type) {
            this.requestType = element.value;
          }
          if ( element.value == 'UnderReview' && element.key == res.result.type) {
            this.showCancelButton = true;
          }
          if ( (element.value == 'Closed' || element.value == 'Ongoing')  && element.key == res.result.type ) {
            this.showRequestDetailsTable = true;
          }
          if ( element.value == 'Draft' && element.key == res.result.type) {
            this.deleteButton = true;
            this.showEditButton = true;
          }
       });
        // if (res.result.type == 4 || res.result.type == 2) {
        //   this.showRequestDetailsTable = true;
        // }
        // // if (res.result.type == 1) {
        // //   this.showCancelButton = true;
        // // }
        // if (res.result.type == 5) {
        //   this.deleteButton = true;
        //   this.showEditButton = true;
        // }
        // if (res.result.type == 6) {
        //   this.showCancelButton = true;
        // }
        this.productStatus = this.ProductStatus[res.result.productStatus].type;
        this.arProductStatus = this.ProductStatus[res.result.productStatus].arType;
        this.spinner.hide();
        localStorage.setItem('customerRequestType', this.requestType);

        resolve(res);
      }, err => {
        this.spinner.hide();
        console.log(err);
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
            element.arDate = moment(element.dueDate).locale('ar-sa').format('LL');
            element.price = element.amount + ' SAR';
            element.arPrice = element.amount + ' ريال سعودي ';
            element.status = this.amountStatus[element.status].type;
            if (element.status == 'Paid') {
              element.arStatus = 'تم الدفع';
            }
            if (element.status == 'Unpaid') {
              element.arStatus = 'غير مدفوع';
            }
            i++;
          });
          this.dataSource = new MatTableDataSource<any>(InstallmentDetails);
          console.log('InstallmentDetails:', InstallmentDetails);
          this.spinner.hide();
        }, err => {
          this.spinner.hide();
          console.log(err);
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
      DelieveryFees: [''],
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
    let actionPayload = {
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
    if (this.totalProducts == 1) {
      this.ENtotalProducts = this.totalProducts + ' Product';
      this.ARtotalProducts = 'منتج واحد';
    }
    if (this.totalProducts > 1) {
      this.ENtotalProducts = this.totalProducts + ' Products';
      this.ARtotalProducts = this.totalProducts + ' منتجات ';
    }
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
    if (Value === '3') {
      this.installmentPeriod = '3-Months';
      this.ARinstallmentPeriod = '3 اشهر';
      this.installmentPeriod_ENUM = 1;
      this.monthlyInstallment = this.totalPriceWithProfit / 3;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '6') {
      this.installmentPeriod = '6-Months';
      this.ARinstallmentPeriod = '6 اشهر';
      this.installmentPeriod_ENUM = 2;
      this.monthlyInstallment = this.totalPriceWithProfit / 6;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '9') {
      this.installmentPeriod = '9-Months';
      this.ARinstallmentPeriod = '9 اشهر';
      this.installmentPeriod_ENUM = 3;
      this.monthlyInstallment = this.totalPriceWithProfit / 9;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
    if (Value === '12') {
      this.installmentPeriod = '12-Months';
      this.ARinstallmentPeriod = '12 اشهر';
      this.installmentPeriod_ENUM = 4;
      this.monthlyInstallment = this.totalPriceWithProfit / 12;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
      this.disabledSubmitButtonSecond = true;
    }
  }


  saveAsDraft(content) {
    this.content = content;
    let actionPayload = {
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
    let actionPayload = {
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
    let actionPayload = {
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
  rescheduleRequest() {
    this.spinner.show();
    this.customerRequestService.requestReschedule(this.requestID).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.modalService.dismissAll();
      this.profileService.showSuccessToastr(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.profileService.showErrorToastr(err.error.message);
    });
  }

}
