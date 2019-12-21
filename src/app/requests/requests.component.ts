import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, NgbDateStruct, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { CustomerRequestService } from '../services/customer-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, customerState } from './../store/app.states';
import { GetAllCustomerRequests } from './../store/actions/customer.actions';

export interface PeriodicElement {
  position: number;
  name: string;
  date: string;
  price: string;
  status: string;
  id?: string;
}

let allCustomerRequestData: PeriodicElement[] = [];
let filterRequestData: PeriodicElement[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})

export class RequestsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;
  showMessage = false;
  isDatainArray = false;

  selectedRequestType = 0;
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  reqID: any;
  displayedColumns: string[] = ['name', 'date', 'price', 'type'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  CustomerRequestType = 'All Requests';
  productStatus: any;
  index: any;
  options: IndividualConfig;
  allRequestData: any;
  allFilterRequests: any;
  getState: Observable<any>;
  requestTypes: any[] = [
    {
      type: 'All Requests'
    },
    {
      type: 'Awaiting for Fund Requests'
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
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastrService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(customerState);
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
    this.showMessage = false;
  }
  getCustomerRequestFromStore() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        if (state.requestsArrayIsEmpty == true) {
          this.isDatainArray = false;
          resolve();
        }
        if (state.isApiCall == false || state.customerRequestsData.length == 0) {
          this.store.dispatch(new GetAllCustomerRequests());
        } else {
          if (state.requestsArrayIsEmpty == false) {
            this.isDatainArray = true;
          }
          this.allRequestData = state.customerRequestsData;
          this.showMessage = false;
          resolve(state.customerRequestsData);
        }
      });
    });
  }

  ngOnInit(): void {
    const customerRequestType = localStorage.getItem('customerRequestType');
    const selectedtype = localStorage.getItem('selectedCustomerRequestType');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });
    this.dataSourceAll.paginator = this.paginator;
    this.dataSourceAll.sort = this.sort;
    this.CustomerRequestType = 'All Requests';
    this.getCustomerRequestFromStore().then(e => {
      allCustomerRequestData.length = 0;
      if (this.isDatainArray == true && this.allRequestData.length > 0) {
        this.allRequestData.forEach(element => {
          allCustomerRequestData.push(element);
          // element.date = moment(element.createdAt).format('LL');
          element.date = moment(element.updatedAt).format('LL');
          element.price = element.totalPaybackAmount + ' SAR';
          element.status = this.requestTypes[element.type].type;
        });
        this.showMessage = false;
        console.log('customerAllRequests:', allCustomerRequestData);
      } else {
        this.showMessage = true;
      }
      if (customerRequestType == selectedtype) {
        this.CustomerRequestType = customerRequestType;
        this.dataSourceAll.filter = customerRequestType;
      } else if (customerRequestType && !selectedtype) {
        this.CustomerRequestType = 'All Requests';
        this.dataSourceAll.filter = '';
      } else {
        this.dataSourceAll.filter = '';
      }
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');
    localStorage.removeItem('customerRequestType');
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  onChange(deviceValue) {
    this.dataSourceAll.filter = deviceValue;
    this.CustomerRequestType = deviceValue;
    localStorage.setItem('selectedCustomerRequestType', deviceValue);
    if (deviceValue == 'All Requests') {
      this.dataSourceAll.filter = '';
      this.CustomerRequestType = 'All Requests';
    }
    if (this.dataSourceAll.filteredData.length > 0) {
      this.showMessage = false;
    } else {
      this.showMessage = true;
    }
  }

  openProductDetails(row) {
    this.reqID = row.id;
    this.router.navigate(['requests-customer', this.reqID]);
  }

  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  selectFromDate(evt: any) {
    this.fromDate = new Date(evt.year, evt.month - 1, evt.day);
    this.fromDate = moment(this.fromDate).format('YYYY-MM-DD');
    this.toDate = '';
    this.disableSearch = true;
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    this.disableSearch = true;
  }
  filterRequests() {
    if (this.selectedRequestType === 0) {
      this.spinner.show();
      this.customerRequestService.getFilteredRequestsByDate(this.fromDate, this.toDate).subscribe((res) => {
        if (res.message) {
          this.showErrorToast('', res.message, 'error');
          this.spinner.hide();
        } else {
          this.allFilterRequests = [];
          this.allFilterRequests = res.result;
          filterRequestData.length = 0;
          console.log('allFilterRequests', this.allFilterRequests);
          this.allFilterRequests.forEach(element => {
            filterRequestData.push(element);
            element.date = moment(element.createdAt).format('LL');
            element.price = element.totalPaybackAmount + ' SAR';
            element.status = this.requestTypes[element.type].type;
          });
          if (this.dataSourceAll.filteredData.length == 0) {
            this.showMessage = true;
          } else {
            this.showMessage = false;
          }
          this.dataSourceAll.data = filterRequestData;
          this.spinner.hide();
          this.disableReset = true;
          this.disableSearch = false;
        }
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
      });
    } else {
      this.spinner.show();
      this.customerRequestService.getFilteredRequestsByTypeAndDate(this.selectedRequestType, this.fromDate, this.toDate)
        .subscribe((res) => {
          if (res.message) {
            this.showErrorToast('', res.message, 'error');
            this.spinner.hide();
          } else {
            this.allFilterRequests = [];
            this.allFilterRequests = res.result;
            filterRequestData.length = 0;
            console.log('allFilterRequests', this.allFilterRequests);
            this.allFilterRequests.forEach(element => {
              filterRequestData.push(element);
              element.date = moment(element.createdAt).format('LL');
              element.price = element.totalPaybackAmount + ' SAR';
              element.status = this.requestTypes[element.type].type;
            });
            if (this.dataSourceAll.filteredData.length == 0) {
              this.showMessage = true;
            } else {
              this.showMessage = false;
            }
            this.dataSourceAll.data = filterRequestData;
            this.spinner.hide();
            this.disableReset = true;
            this.disableSearch = false;
          }
        }, err => {
          this.spinner.hide();
          console.log(' ERROR:', err);
        });

    }
  }
  resetPage() {
    this.dataSourceAll.filter = '';
    this.dataSourceAll.data = allCustomerRequestData;
    this.CustomerRequestType = 'All Requests';
    this.fromDate = '';
    this.toDate = '';
    this.disableSearch = false;
    this.disableReset = false;
  }

}
