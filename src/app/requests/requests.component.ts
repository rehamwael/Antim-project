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

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  slectedProduct = false;
  productStatus: any;
  options: IndividualConfig;
  allRequestData: any;
  allData: boolean;

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
    this.getAllCustomersRequests();
  }


  getAllCustomersRequests() {
    allCustomerRequestData.length = 0;
    console.log('customerAllRequests:', allCustomerRequestData);
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
        if (element.type === 4) {
          element.status = 'Waiting for approval';
        }
        if (element.type === 2) {
          element.status = 'Closed';
        }
        if (element.type === 3) {
          element.status = 'Ongoing';
        }
        if (element.type === 6) {
          element.status = 'Rejected';
        }
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
    console.log('requestTypeParams', requestTypeParams);
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

  onChange(deviceValue) {
    this.dataSourceAll.filter = deviceValue;
    this.requestType = deviceValue;
    if (deviceValue === '') {
      this.requestType = 'All Requests';
      this.allData = true;
    }
    if (deviceValue === 'Waiting for approval') {
      this.requestType = 'Waiting for approval';
    }

    if (deviceValue === 'Ongoing') {
      this.requestType = 'Ongoing';
    }
    if (deviceValue === 'Rejected') {
      this.requestType = 'Rejected';
    }
    if (deviceValue === 'Closed') {
      this.requestType = 'Closed';
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
  //       if (element.type === 6) {
  //         element.status = 'Rejected';
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
  //       if (element.type === 2) {
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
