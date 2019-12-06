import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbDateStruct, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { CustomerRequestService } from '../services/customer-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

export interface PeriodicElement {
  position: number;
  name: string;
  date: string;
  value: string;
  status: string;
  id?: string;
}
// tslint:disable-next-line: prefer-const
let allCustomerRequestData: PeriodicElement[] = [];
// tslint:disable-next-line: prefer-const
let filterRequestData: PeriodicElement[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit, OnDestroy {

  fromDate = null;
  toDate = null;

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
  allData: boolean;

  constructor(private modalService: NgbModal,
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

  getAllCustomersRequests() {
    return new Promise((resolve, reject) => {
      allCustomerRequestData.length = 0;
      this.spinner.show();
      this.customerRequestService.customerAllRequests().subscribe(res => {
        this.allData = true;
        this.spinner.hide();
        this.allRequestData = res.result;
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
            element.status = 'UnderReview';
          }
          element.position = i;
          i++;
        });
        console.log('customerAllRequests:', allCustomerRequestData);
        resolve(res);
      }, err => {
        reject(err);
        this.spinner.hide();
        console.log('ERROR:', err);
      });
    });
  }
  ngOnInit(): void {
    this.getAllCustomersRequests().then(e => {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('dashbored');
      body.classList.add('requests');
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
      const requestTypeParams = this.route.snapshot.paramMap.get('type');
      this.dataSourceAll.filter = requestTypeParams;
      if (requestTypeParams === '') {
        this.requestType = 'All Requests';
      } else {
        this.requestType = requestTypeParams;
      }
    });
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');
  }

  onChange(deviceValue) {
    this.dataSourceAll.filter = deviceValue;
    this.requestType = deviceValue;
    if (deviceValue === '') {
      this.requestType = 'All Requests';
      this.selectedRequestType = 0;
      this.allData = true;
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
    if (deviceValue === 'UnderReview') {
      this.requestType = 'UnderReview';
      this.selectedRequestType = 7;
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
    console.log(this.fromDate);
    this.toDate = '';
  }
  selectToDate(evt: any) {
    this.toDate = new Date(evt.year, evt.month - 1, evt.day);
    this.toDate = moment(this.toDate).format('YYYY-MM-DD');
    console.log(this.toDate);
  }
  filterRequests() {
    if (this.selectedRequestType === 0) {
      this.spinner.show();
      console.log(this.fromDate, this.toDate);
      this.customerRequestService.getFilteredRequestsByDate(this.fromDate, this.toDate).subscribe((res) => {
        if (res.message) {
          this.showErrorToast('Error!!', res.message, 'error');
          this.spinner.hide();
        } else {
        this.allFilterRequests = [];
        this.allFilterRequests = res.result;
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
        this.dataSourceAll = new MatTableDataSource<PeriodicElement>(filterRequestData);
        this.spinner.hide();
      }
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
      });
    } else {
      console.log(this.selectedRequestType, this.fromDate, this.toDate);
      this.spinner.show();
      this.customerRequestService.getFilteredRequestsByTypeAndDate(this.selectedRequestType, this.fromDate, this.toDate)
      .subscribe((res) => {
        if (res.message) {
          this.showErrorToast('Error!!', res.message, 'error');
          this.spinner.hide();
        } else {
          this.allFilterRequests = [];
          this.allFilterRequests = res.result;
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
          this.dataSourceAll = new MatTableDataSource<PeriodicElement>(filterRequestData);
          this.spinner.hide();
        }
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
      });

    }
  }

}
