import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FunderRequestService } from './../services/funder-requests.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState, funderState } from '../store/app.states';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { SaveRequestType } from './../store/actions/funder.actions';
import { ProfileService } from '../services/userProfile.service';
import { TranslateService } from '@ngx-translate/core';

let InstallmentDetails: any[] = [];


let AllAwaitingRequests: any[] = [];
let AllFunderRequests: any[] = [];

@Component({
  selector: 'app-request-lender',
  templateUrl: './request-lender.component.html',
  styleUrls: ['./request-lender.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RequestLenderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  displayedColumns: string[] = ['name', 'date', 'price', 'status'];
  dataSource = new MatTableDataSource<any>(AllFunderRequests);
  selection = new SelectionModel<any>(true, []);

  selectedRequestType = '';
  selectedProduct = false;
  productStatus: any;
  customerRequestId: any;
  content4: any;
  funderRequestsData: any;
  awaitingRequestsData: any;
  showMessage = false;
  reqID: any;
  funderRequestData: any;

  requestDetails: any;
  requestName: any;
  requestDate: any;
  requestAmount: any;
  funderRequestType: any;
  productList: any[] = [{
    productUrl: '',
    amount: null
  }];
  RequestType_ENUM: any;
  RequestType: any;
  totalPrice: number;
  totalProfit: number;
  totalPriceWithProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  installmentPeriod_ENUM: any;
  getState: Observable<any>;
  requestTypeInStore: any;
  showRequestDetailsTable: boolean;

  requestTypes: any[] = [
    {
      type: 'All Requests'
    },
    {
      type: 'Ongoing Requests'
    },
    {
      type: 'Closed Requests'
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
  InstallmentDetailsTable = new MatTableDataSource<any>(InstallmentDetails);
  displayColumns: string[] = ['months', 'dueDate', 'price', 'status'];
  monthlyInstallmentsData: any;
  showTable = false;
  userLang: any;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private funderRequestService: FunderRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private profileService: ProfileService,
    public translate: TranslateService,

  ) {
    this.getState = this.store.select(funderState);
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });

  }

  GetFunderAllRequests() {
    this.spinner.show();
    this.funderRequestService.getFunderAllRequests().subscribe(res => {
      console.log(res);
      if (res.result.otherRequests.length == 0 && res.result.awaitingRequests == null) {
        this.showMessage = true;
        this.spinner.hide();
        // this.profileService.showErrorToastr(res.message);
      } else {
        AllFunderRequests.length = 0;
        this.funderRequestData = res.result.otherRequests;
        this.awaitingRequestsData = res.result.awaitingRequests;
        if (this.funderRequestData.length > 0) {
          this.funderRequestData.forEach(element => {
            AllFunderRequests.push(element);
            element.name = element.requestName;
            element.date = moment(element.startingDate).format('LL');
            element.price = element.fundedAmount + ' SAR';
            element.status = this.requestTypes[element.requestType].type;
          });
        }
        if (this.awaitingRequestsData != null) {
          this.awaitingRequestsData.forEach(element => {
            AllFunderRequests.push(element);
            element.date = moment(element.updatedAt).format('LL');
            element.price = element.totalFundAmount + ' SAR';
            element.status = 'Awaiting For Fund Requests';
          });
        }
        this.dataSource = new MatTableDataSource<any>(AllFunderRequests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showMessage = false;
        this.spinner.hide();
        console.log('FunderAllRequests:', AllFunderRequests);
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getFundingLimitingMatchingRequest() {
    this.spinner.show();
    this.funderRequestService.fundingLimitMatchingRequests().subscribe(res => {
      console.log(res);
      if (res.message) {
        this.dataSource = new MatTableDataSource<any>(null);
        this.showMessage = true;
        // this.profileService.showErrorToastr(res.message);
        this.spinner.hide();
      } else {
        this.awaitingRequestsData = res.result;
        AllAwaitingRequests.length = 0;
        this.awaitingRequestsData.forEach(element => {
          AllAwaitingRequests.push(element);
          element.date = moment(element.updatedAt).format('LL');
          element.price = element.totalFundAmount + ' SAR';
          element.status = 'Awaiting For Fund Requests';
        });
        this.dataSource = new MatTableDataSource<any>(AllAwaitingRequests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('AllawaitingRequests:', AllAwaitingRequests);
        this.spinner.hide();
        if (this.dataSource.filteredData.length == 0) {
        } else {
          this.showMessage = false;
        }
      }
    }, err => {
      console.log(err);
      this.spinner.hide();
      this.profileService.showErrorToastr(err.error.message);
    });

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(null);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');

    this.getState.subscribe((state) => {
      this.requestTypeInStore = state.requestType;
    });

    let selectedFunderRequestType = localStorage.getItem('selectedFunderRequestType');
    if (this.requestTypeInStore == selectedFunderRequestType && selectedFunderRequestType != null) {
      this.selectedRequestType = this.requestTypeInStore;
      this.getFundingLimitingMatchingRequest();
    } else if (selectedFunderRequestType == 'All Requests') {
      this.selectedRequestType = selectedFunderRequestType;
      this.GetFunderAllRequests();
    } else if (selectedFunderRequestType == this.selectedRequestType) {
      this.dataSource.filter = selectedFunderRequestType;
    } else {
      this.GetFunderAllRequests();
    }
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

  onChange(deviceValue) {
    this.selectedRequestType = deviceValue;
    if (deviceValue != 'Awaiting For Fund Requests') {
      this.dataSource = new MatTableDataSource<any>(AllFunderRequests);
      this.dataSource.filter = deviceValue;
    }
    localStorage.setItem('selectedFunderRequestType', this.selectedRequestType);
    if (deviceValue == 'All Requests') {
      this.dataSource = new MatTableDataSource<any>(null);
      this.GetFunderAllRequests();
      this.dataSource.filter = '';
      this.selectedRequestType = 'All Requests';
    }

    if (deviceValue == 'Awaiting For Fund Requests') {
      this.dataSource = new MatTableDataSource<any>(null);
      this.getFundingLimitingMatchingRequest();
    }
    if (this.dataSource.filteredData && this.dataSource.filteredData.length == 0) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }
  openProductDetails(row) {
    this.reqID = row.id;
    if (row.type == 1) {
      this.store.dispatch(new SaveRequestType('Awaiting For Fund Requests'));
      this.router.navigate(['requests-funder', this.reqID]);
    } else {
      this.spinner.show();
      this.funderRequestService.getRequestDataById(row.id).subscribe(res => {
        console.log(res);
        this.requestDetails = res.result;
        this.productList = res.result.customerRequestProducts.slice();
        this.requestDate = moment(res.result.startingDate).format('LL');
        // this.monthlyInstallment = res.result.monthlyInstallmentAmount;
        this.requestName = res.result.requestName;
        this.totalPrice = res.result.fundedAmount;
        this.totalPriceWithProfit = res.result.totalPaybackAmount;
        this.totalProfit = this.totalPriceWithProfit - this.totalPrice;
        this.totalProfit = Math.round((this.totalProfit * 80) / 100);
        this.monthlyInstallment = Math.round((this.totalPrice + this.totalProfit) / (res.result.paybackPeriod * 3));
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
        this.RequestType_ENUM = res.result.requestType;
        this.RequestType = this.requestTypes[res.result.requestType].type;
        if (this.RequestType_ENUM == 2) {
          this.showRequestDetailsTable = true;
        }
        this.productStatus = this.ProductStatus[res.result.productStatus].type;
        this.customerRequestId = res.result.customerRequestId;
        if (res.result.productStatus == 3) {
          this.showRequestDetailsTable = true;
          this.showTable = true;
          this.spinner.show();
          // tslint:disable-next-line: no-shadowed-variable
          this.funderRequestService.getRequestInstallmentDetails(this.customerRequestId).subscribe(res => {
            console.log(res);
            this.monthlyInstallmentsData = res.result.customerInstallments;
            InstallmentDetails.length = 0;
            let i = 1;
            this.monthlyInstallmentsData.forEach(element => {
              InstallmentDetails.push(element);
              element.month = i;
              element.date = moment(element.dueDate).format('LL');
              element.price = Math.round((element.amount - element.intimeMonthlyProfit)) + ' SAR';
              element.status = this.amountStatus[element.status].type;
              i++;
            });
            this.InstallmentDetailsTable = new MatTableDataSource<any>(InstallmentDetails);
            console.log('InstallmentDetails:', InstallmentDetails);
            this.spinner.hide();
          }, err => {
            this.spinner.hide();
            console.log(err);
          });
        } else {
          this.showTable = false;
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
      this.selectedProduct = true;
    }
  }
  closeRequesttDetails() {
    if (this.selectedRequestType != 'All Requests') {
      this.selectedRequestType = this.RequestType;
    }
    this.selectedProduct = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }
}
