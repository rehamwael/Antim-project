import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
}

const allCustomerRequestData: PeriodicElement[] = [];
const awaitingRequestData: PeriodicElement[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  dataSourceAwaiting = new MatTableDataSource<PeriodicElement>(awaitingRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  slectedProduct = false;
  productStatus: any;
  options: IndividualConfig;
  allRequestData: any;
  awaitingRequestData: any;
  allData = false;
  awaitingData = false;
  ongoingData = false;
  closedData = false;
  rejectData = false;

  constructor(private modalService: NgbModal,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }

  getAwaitingRequestsData() {
    awaitingRequestData.length = 0;
    console.log('customerAwaitingRequests:', awaitingRequestData);
    this.spinner.show();
    this.customerRequestService.customerAwaitingRequests().subscribe(res => {
      this.allData = true;
      this.spinner.hide();
      this.awaitingRequestData = res.result;
      let i = 1;
      this.awaitingRequestData.forEach(element => {
        awaitingRequestData.push(element);
        element.date = moment(element.createdAt).format('LL');
        element.value = element.totalPaybackAmount + ' SAR';
        if (element.type === 4) {
          element.status = 'Waiting for approval';
        }
        element.position = i;
        i++;
      });
      console.log('customerAwaitingRequests:', awaitingRequestData);
    }, err => {
      this.spinner.hide();
      console.log('ERROR:', err);
    });

  }
  getAllCustomersRequests() {
    allCustomerRequestData.length = 0;
    console.log('customerAllRequests:', allCustomerRequestData);
    this.spinner.show();
    this.customerRequestService.customerAllRequests().subscribe(res => {
      this.spinner.hide();
      this.allRequestData = res.result;
      let i = 1;
      this.allRequestData.forEach(element => {
        allCustomerRequestData.push(element);
        element.date = moment(element.createdAt).format('LL');
        element.value = element.totalPaybackAmount + ' SAR';
        if (element.type === 4) {
          element.status = 'Waiting for approval';
        }
        // element.status = element.type ';
        element.position = i;
        i++;
      });
      console.log('customerAllRequests:', allCustomerRequestData);
    }, err => {
      this.spinner.hide();
      console.log('ERROR:', err);
    });
  }
  ngOnInit(): void {
    this.getAllCustomersRequests();
    this.getAwaitingRequestsData();

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
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceAll.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceAll.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //  MAster BRANCH
  // onChange(deviceValue) {
  //   this.dataSource.filter = deviceValue;
  //   this.requestType = deviceValue;
  //   if(deviceValue == ""){
  //     this.requestType = "All Requests";
  //   }
  // }

  onChange(deviceValue) {
    if (deviceValue === '') {
      this.awaitingData = false;
      this.allData = true;
      this.ongoingData = false;
      this.rejectData = false;
      this.closedData = false;
    }
    if (deviceValue === 'Wating your approval') {
      this.allData = false;
      this.awaitingData = true;
      this.ongoingData = false;
      this.rejectData = false;
      this.closedData = false;
    }

    if (deviceValue === 'Ongoing') {
      this.awaitingData = false;
      this.allData = false;
      this.ongoingData = true;
      // this.rejectData = true;
      // this.closedData = true;
    }
    if (deviceValue === 'Reject') {
      this.awaitingData = false;
      this.allData = false;
      this.rejectData = true;
      // this.ongoingData = true;
      // this.closedData = true;

    }
    if (deviceValue === 'Closed') {
      this.awaitingData = false;
      this.allData = false;
      this.closedData = true;
      // this.ongoingData = true;
      // this.rejectData = true;
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
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  // getOngoingRequestsData() {
  //   OngoingRequestData.length = 0;
  //   console.log('OngoingRequestData:', OngoingRequestData);
  //   this.spinner.show();
  //   this.customerRequestService.customerAwaitingRequests().subscribe(res => {
  //     this.spinner.hide();
  //     this.ongoingRequestsData = res.result;
  //     let i = 1;
  //     this.ongoingRequestsData.forEach(element => {
  //       OngoingRequestData.push(element);
  //       element.date = moment(element.createdAt).format('LL');
  //       element.value = element.totalPaybackAmount + ' SAR';
  //       if (element.type === 3) {
  //         element.status = 'Ongoing';
  //       }
  //       element.position = i;
  //       i++;
  //     });
  //     console.log('OngoingRequestData:', OngoingRequestData);
  //   }, err => {
  //     this.spinner.hide();
  //     console.log('ERROR:', err);
  //   });
  // }
  // getRejectedRequestsData() {
  //   rejectedRequestData.length = 0;
  //   console.log('rejectedRequestData:', rejectedRequestData);
  //   this.spinner.show();
  //   this.customerRequestService.customerRejectedRequests().subscribe(res => {
  //     this.spinner.hide();
  //     this.rejectedRequestsData = res.result;
  //     let i = 1;
  //     this.rejectedRequestsData.forEach(element => {
  //       rejectedRequestData.push(element);
  //       element.date = moment(element.createdAt).format('LL');
  //       element.value = element.totalPaybackAmount + ' SAR';
  //       if (element.type === 2) {
  //         element.status = 'Reject';
  //       }
  //       element.position = i;
  //       i++;
  //     });
  //     console.log('rejectedRequestData:', rejectedRequestData);
  //   }, err => {
  //     this.spinner.hide();
  //     console.log('ERROR:', err);
  //   });
  // }
  // getClosedRequestsData() {
  //   closedRequestsData.length = 0;
  //   console.log('closedRequestsData:', closedRequestsData);
  //   this.spinner.show();
  //   this.customerRequestService.customerClosedRequests().subscribe(res => {
  //     this.spinner.hide();
  //     this.closedRequestData = res.result;
  //     let i = 1;
  //     this.closedRequestData.forEach(element => {
  //       closedRequestsData.push(element);
  //       element.date = moment(element.createdAt).format('LL');
  //       element.value = element.totalPaybackAmount + ' SAR';
  //       if (element.type === 1) {
  //         element.status = 'Closed';
  //       }
  //       element.position = i;
  //       i++;
  //     });
  //     console.log('closedRequestsData:', closedRequestsData);
  //   }, err => {
  //     this.spinner.hide();
  //     console.log('ERROR:', err);
  //   });
  // }

}
