import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FunderRequestService } from './../services/funder-requests.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  dataSource = new MatTableDataSource<PeriodicElement>(AllAwaitingRequests);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'My All Requests';
  slectedProduct = false;
  productStatus: any;
  content4: any;
  funderRequestsData: any;
  awaitingRequestsData: any;
  showMessage = false;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastrService,
    private funderRequestService: FunderRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.funderRequestService.funderAllRequests().subscribe(res => {
      console.log(res.result);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');
    // if (this.productStatus === 'Wating Fund') {
    //   this.modalService.open(this.content4, { centered: true });
    // }

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
    if (deviceValue === '') {
      this.requestType = 'My All Requests';

    }
    if (deviceValue === 'Awaiting Fund') {
      this.spinner.show();
      this.funderRequestService.fundingLimitMatchingRequests().subscribe(res => {
        console.log('AllawaitingRequests:', res.result);

        this.awaitingRequestsData = res.result;
        AllAwaitingRequests.length = 0;
        // if (this.isDatainArray == true && this.allRequestData.length > 0) {
        this.awaitingRequestsData.forEach(element => {
          AllAwaitingRequests.push(element);
          // element.date = moment(element.createdAt).format('LL');
          element.date = moment(element.updatedAt).format('LL');
          element.price = element.totalPaybackAmount + ' SAR';
          element.status = 'AWAITING FOR FUND';
        });
        // this.dataSource.data = AllAwaitingRequests;
        this.dataSource = new MatTableDataSource<PeriodicElement>(AllAwaitingRequests);
        this.dataSource.paginator = this.paginator;
        console.log('AllawaitingRequests:', AllAwaitingRequests);
        this.spinner.hide();
        if (this.dataSource.filteredData.length == 0) {
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
        // } else {
        //   this.showMessage = true;
        // }
        // if (type == selectedtype) {
        //   this.requestType = type;
        //   this.dataSourceAll.filter = type;
        // } else if (type && !selectedtype) {
        //   this.requestType = 'All Requests';
        //   this.dataSourceAll.filter = '';
        // } else {
        //   this.dataSourceAll.filter = '';
        // }
      });
    }

  }
  openProductDetails(row) {
    console.log(row);
    this.productStatus = row.status;
    this.slectedProduct = true;
  }
  closeProductDetails() {
    this.slectedProduct = false;
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
}
