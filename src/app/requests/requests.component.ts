import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  value: string;
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

  fromDate = null;
  toDate = null;
  disableReset = false;
  disableSearch = false;
  showMessage = false;

  selectedRequestType = 0;
  model1: NgbDateStruct;
  model2: NgbDateStruct;
  reqID: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  productStatus: any;
  index: any;
  options: IndividualConfig;
  allRequestData: any;
  allFilterRequests: any;
  getState: Observable<any>;

  constructor(private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute,
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
        if (state.isApiCall == false || state.customerRequestsData.length == 0) {
          this.store.dispatch(new GetAllCustomerRequests());
        } else {
          this.allRequestData = state.customerRequestsData;
          resolve(state.customerRequestsData);
        }
      });
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSourceAll.paginator = this.paginator;
  }
  ngOnInit(): void {
    const type = localStorage.getItem('requestType');
    const selectedtype = localStorage.getItem('selectedRequestType');
    this.requestType = 'All Requests';
    this.getCustomerRequestFromStore().then(e => {
      this.allRequestData = e;
      allCustomerRequestData.length = 0;
      let i = 1;
      this.allRequestData.forEach(element => {
        allCustomerRequestData.push(element);
        element.date = moment(element.createdAt).format('LL');
        element.value = element.totalPaybackAmount + ' SAR';
        if (element.type === 1) {
          element.status = 'Waiting for approval';
        }
        if (element.type === 2) {
          element.status = 'Closed';
        }
        if (element.type === 3) {
          element.status = 'Rejected';
        }
        if (element.type === 4) {
          element.status = 'Ongoing';
        }
        if (element.type === 5) {
          element.status = 'Draft';
        }
        if (element.type === 6) {
          element.status = 'Accepted';
        }
        if (element.type === 7) {
          element.status = 'Under Review';
        }
        element.position = i;
        i++;
      });
      if (this.dataSourceAll.filteredData.length == 0) {
        this.showMessage = true;
      } else {
        this.showMessage = false;
      }
      console.log('customerAllRequests:', allCustomerRequestData);
      if (type == selectedtype) {
        this.requestType = type;
        this.dataSourceAll.filter = type;
      } else if (type && !selectedtype) {
        this.requestType = 'All Requests';
        this.dataSourceAll.filter = '';
      } else {
        this.dataSourceAll.filter = '';
      }
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('dashbored');
      body.classList.add('requests');
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
    });

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');
    localStorage.removeItem('requestType');
    // localStorage.removeItem('selectedRequestType');
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  onChange(deviceValue) {
    this.dataSourceAll.filter = deviceValue;
    this.requestType = deviceValue;
    if (deviceValue === 'All Requests') {
      this.dataSourceAll.filter = '';
      this.requestType = 'All Requests';
      this.selectedRequestType = 0;
      // this.ngOnInit();
      // this.fromDate = '';
      // this.toDate = '';
    }
    if (deviceValue === 'Waiting for approval') {
      this.requestType = 'Waiting for approval';
      this.selectedRequestType = 1;
    }

    if (deviceValue === 'Ongoing') {
      this.requestType = 'Ongoing';
      this.selectedRequestType = 4;
    }
    if (deviceValue === 'Rejected') {
      this.requestType = 'Rejected';
      this.selectedRequestType = 3;
    }
    if (deviceValue === 'Closed') {
      this.requestType = 'Closed';
      this.selectedRequestType = 2;
    }
    if (deviceValue === 'Draft') {
      this.requestType = 'Draft';
      this.selectedRequestType = 5;
    }
    if (deviceValue === 'Accepted') {
      this.requestType = 'Accepted';
      this.selectedRequestType = 6;
    }
    if (deviceValue === 'Under Review') {
      this.requestType = 'Under Review';
      this.selectedRequestType = 7;
    }
    console.log(this.dataSourceAll.filteredData.length);
    if (this.dataSourceAll.filteredData.length > 0) {
      this.showMessage = false;
    } else {
      this.showMessage = true;
    }
    localStorage.setItem('selectedRequestType', this.requestType);
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
    // console.log(this.fromDate);
    this.toDate = '';
    this.disableSearch = true;
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    // console.log(this.toDate);
    this.disableSearch = true;
  }
  filterRequests() {
    if (this.selectedRequestType === 0) {
      this.spinner.show();
      this.customerRequestService.getFilteredRequestsByDate(this.fromDate, this.toDate).subscribe((res) => {
        if (res.message) {
          this.showErrorToast('Error!!', res.message, 'error');
          this.spinner.hide();
        } else {
          this.allFilterRequests = [];
          this.allFilterRequests = res.result;
          filterRequestData.length = 0;
          console.log('allFilterRequests', this.allFilterRequests);
          let i = 1;
          this.allFilterRequests.forEach(element => {
            filterRequestData.push(element);
            element.date = moment(element.createdAt).format('LL');
            element.value = element.totalPaybackAmount + ' SAR';
            if (element.type === 1) {
              element.status = 'Waiting for approval';
            }
            if (element.type === 2) {
              element.status = 'Closed';
            }
            if (element.type === 3) {
              element.status = 'Rejected';
            }
            if (element.type === 4) {
              element.status = 'Ongoing';
            }
            if (element.type === 5) {
              element.status = 'Draft';
            }
            if (element.type === 6) {
              element.status = 'Accepted';
            }
            if (element.type === 7) {
              element.status = 'UnderReview';
            }
            element.position = i;
            i++;
          });
          if (this.dataSourceAll.filteredData.length == 0) {
            this.showMessage = true;
          } else {
            this.showMessage = false;
          }
          this.dataSourceAll.data = filterRequestData;
          // this.dataSourceAll = new MatTableDataSource<PeriodicElement>(filterRequestData);
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
            this.showErrorToast('Error!!', res.message, 'error');
            this.spinner.hide();
          } else {
            this.allFilterRequests = [];
            this.allFilterRequests = res.result;
            filterRequestData.length = 0;
            console.log('allFilterRequests', this.allFilterRequests);
            let i = 1;
            this.allFilterRequests.forEach(element => {
              filterRequestData.push(element);
              element.date = moment(element.createdAt).format('LL');
              element.value = element.totalPaybackAmount + ' SAR';
              if (element.type === 1) {
                element.status = 'Waiting for approval';
              }
              if (element.type === 2) {
                element.status = 'Closed';
              }
              if (element.type === 3) {
                element.status = 'Rejected';
              }
              if (element.type === 4) {
                element.status = 'Ongoing';
              }
              if (element.type === 5) {
                element.status = 'Draft';
              }
              if (element.type === 6) {
                element.status = 'Accepted';
              }
              if (element.type === 7) {
                element.status = 'UnderReview';
              }
              element.position = i;
              i++;
            });
            if (this.dataSourceAll.filteredData.length == 0) {
              this.showMessage = true;
            } else {
              this.showMessage = false;
            }
            this.dataSourceAll.data = filterRequestData;
            // this.dataSourceAll = new MatTableDataSource<PeriodicElement>(filterRequestData);
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
    this.dataSourceAll.data = allCustomerRequestData;
    this.fromDate = '';
    this.toDate = '';
    this.dataSourceAll.filter = '';
    this.disableSearch = false;
    this.disableReset = false;
  }

}
