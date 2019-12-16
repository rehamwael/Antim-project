import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FunderRequestService } from './../services/funder-requests.service';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import * as moment from 'moment';

export interface PeriodicElement {
  position?: number;
  name: string;
  date: string;
  price: string;
  status: string;
}

let AllAwaitingRequests: PeriodicElement[] = [];
let AllFunderRequests: PeriodicElement[] = [];

@Component({
  selector: 'app-request-lender',
  templateUrl: './request-lender.component.html',
  styleUrls: ['./request-lender.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RequestLenderComponent implements OnInit, OnDestroy {
  @ViewChild('clickMe', { static: false }) clickMe: ElementRef<HTMLElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns: string[] = ['name', 'date', 'price', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(AllFunderRequests);
  // dataSource = new MatTableDataSource<PeriodicElement>(AllAwaitingRequests);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'My All Requests';
  selectedProduct = false;
  productStatus: any;
  content4: any;
  funderRequestsData: any;
  awaitingRequestsData: any;
  showMessage = false;
  options: IndividualConfig;
  reqID: any;
  funderRequestData: any;

  requestName: any;
  requestDate: any;
  requestAmount: any;
  funderRequestType: any;
  productList: any[] = [{
    productUrl: '',
    amount: null
  }];
  requestType_ENUM: any;
  RequestType: any;
  totalPrice: number;
  totalPriceWithProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  installmentPeriod_ENUM: any;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastrService,
    private funderRequestService: FunderRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.requestType = 'All Requests';
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  ngOnInit(): void {
    this.requestType = 'All Requests';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.funderRequestService.funderAllRequests().subscribe(res => {
      console.log(res);
      if (res.message) {
        this.showMessage = true;
        this.showErrorToast('', res.message, 'error');
      } else {
        this.showMessage = false;
        this.funderRequestData = res.result;
        AllFunderRequests.length = 0;
        this.funderRequestData.forEach(element => {
          AllFunderRequests.push(element);
          element.name = element.requestName;
          element.date = moment(element.startingDate).format('LL');
          element.price = element.fundedAmount + ' SAR';
          element.status = 'Ongoing Request';
        });
        this.dataSource = new MatTableDataSource<PeriodicElement>(AllFunderRequests);
        if (this.dataSource.filteredData.length == 0) {
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
        console.log('FunderAllRequests:', AllFunderRequests);
      }
    }, err => {
      console.log(err);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');

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
    this.dataSource.filter = deviceValue;
    this.requestType = deviceValue;
    if (deviceValue == '') {
      this.dataSource = new MatTableDataSource<PeriodicElement>(AllFunderRequests);
      this.dataSource.filter = '';
      this.requestType = 'All Requests';
    }
    if (deviceValue == 'Ongoing') {
      this.dataSource = new MatTableDataSource<PeriodicElement>(AllFunderRequests);
      this.dataSource.filter = deviceValue;
      this.requestType = deviceValue;
    }
    if (deviceValue == 'Closed') {
      this.dataSource = new MatTableDataSource<PeriodicElement>(AllFunderRequests);
      this.dataSource.filter = deviceValue;
      this.requestType = deviceValue;
    }
    if (deviceValue === 'Awaiting Fund') {
      this.spinner.show();
      this.funderRequestService.fundingLimitMatchingRequests().subscribe(res => {
        if (res.message) {
          this.showErrorToast('Error!!', res.message, 'error');
          this.spinner.hide();

        } else {
          console.log('AllawaitingRequests:', res.result);

          this.awaitingRequestsData = res.result;
          AllAwaitingRequests.length = 0;
          // if (this.isDatainArray == true && this.allRequestData.length > 0) {
          this.awaitingRequestsData.forEach(element => {
            AllAwaitingRequests.push(element);
            element.date = moment(element.updatedAt).format('LL');
            element.price = element.totalPaybackAmount + ' SAR';
            element.status = 'AWAITING FOR FUND';
          });
          // this.dataSource.data = AllAwaitingRequests;
          this.dataSource = new MatTableDataSource<PeriodicElement>(AllAwaitingRequests);
          console.log('AllawaitingRequests:', AllAwaitingRequests);
          this.spinner.hide();
          if (this.dataSource.filteredData.length == 0) {
            this.showMessage = true;
          } else {
            this.showMessage = false;
          }
        }
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    }
    if (this.dataSource.filteredData.length == 0) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }
  openProductDetails(row) {
    console.log(row);
    this.reqID = row.id;
     if (row.type == 1) {
      this.router.navigate(['requests-funder', this.reqID]);
    } else {
      this.spinner.show();
      this.funderRequestService.getRequestDataById(row.id).subscribe(res => {
        console.log('REQUEST DETAILS: ', res.result);
        // this.productList = res.result.customerRequestProducts.slice();
        this.requestDate = moment(res.result.startingDate).format('LL');
        this.monthlyInstallment = res.result.monthlyPaybackAmount;
        this.requestName = res.result.requesterName;
        this.totalPrice = res.result.fundedAmount;
        // this.totalPriceWithProfit = res.result.totalPaybackAmount;
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
        this.requestType_ENUM = res.result.requestStatus;
        if (this.requestType_ENUM == 2) {
          this.RequestType = 'Ongoing Request';
        }
        if (this.requestType_ENUM == 3) {
          this.RequestType = 'Closed Request';
        }
        this.spinner.hide();
        localStorage.setItem('requestType', this.requestType);
      }, err => {
        console.log(err);
      });
      this.selectedProduct = true;
    }
  }
  closeProductDetails() {
    this.selectedProduct = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
}
