import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal, NgbDateStruct, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CustomerRequestService } from '../services/customer-request.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, customerState } from './../store/app.states';
import { GetAllCustomerRequests } from './../store/actions/customer.actions';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProfileService } from '../services/userProfile.service';
import { TranslateService } from '@ngx-translate/core';

let allCustomerRequestData: any[] = [];
let filterRequestData: any[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  dataSourceAll = new MatTableDataSource<any>(allCustomerRequestData);
  selection = new SelectionModel<any>(true, []);
  CustomerRequestType = '';
  productStatus: any;
  index: any;
  allRequestData: any;
  allFilterRequests: any;
  getState: Observable<any>;
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
  userLang: any;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private customerRequestService: CustomerRequestService,
    private spinner: NgxSpinnerService,
    private store: Store<AppState>,
    private profileService: ProfileService,
    public translate: TranslateService,
  ) {
    this.getState = this.store.select(customerState);
    this.showMessage = false;
    this.userLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
    });

  }
  getCustomerRequestFromStore() {
    return new Promise((resolve, reject) => {
      this.getState.subscribe((state) => {
        console.log('in requests', state);
        if (state.requestsArrayIsEmpty == false) {
          this.isDatainArray = true;
          resolve();
        }
        if (state.isApiCall == false && state.customerRequestsData.length == 0) {
          this.store.dispatch(new GetAllCustomerRequests());
        } else {
          this.isDatainArray = true;
          this.allRequestData = state.customerRequestsData;
          this.showMessage = false;
          resolve(state.customerRequestsData);
        }
        // if (state.isUpdated == true && state.customerRequestsData.length == 0) {
        //   this.store.dispatch(new GetAllCustomerRequests());
        // }
      });
    });
  }

  ngOnInit(): void {
    let customerRequestType = localStorage.getItem('customerRequestType');
    let selectedtype = localStorage.getItem('selectedCustomerRequestType');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.getCustomerRequestFromStore().then(e => {
      allCustomerRequestData.length = 0;
      if (this.isDatainArray == true && this.allRequestData.length > 0) {
        this.allRequestData.forEach(element => {
          allCustomerRequestData.push(element);
          // element.date = moment(element.createdAt).format('LL');
          element.date = moment(element.updatedAt).format('LL');
          element.arDate = moment(element.updatedAt).locale('ar-sa').format('LL');
          element.price = element.totalPaybackAmount + element.delieveryFees + ' SAR';
          element.arPrice = element.totalPaybackAmount + element.delieveryFees + ' ريال سعودي ';
          element.enStatus = this.requestTypes[element.type].type;
          element.arStatus = this.requestTypes[element.type].arType;
        });
        // this.CustomerRequestType = 'All Requests';
        this.dataSourceAll = new MatTableDataSource<any>(allCustomerRequestData);
        // console.log('customerAllRequests:', allCustomerRequestData);
        this.dataSourceAll.paginator = this.paginator;
        this.dataSourceAll.sort = this.sort;
        this.showMessage = false;
      } else {
        this.dataSourceAll = new MatTableDataSource<any>(null);
        this.showMessage = true;
      }
      if (customerRequestType == selectedtype && customerRequestType != null && selectedtype != null ) {
        this.CustomerRequestType = customerRequestType;
        this.dataSourceAll.filter = customerRequestType;
      }  else if (customerRequestType != selectedtype) {
        this.CustomerRequestType = 'All Requests';
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

  onChange(deviceValue) {
    console.log(deviceValue);
    this.dataSourceAll.filter = deviceValue;
    this.CustomerRequestType = deviceValue;
    localStorage.setItem('selectedCustomerRequestType', deviceValue);
    if (deviceValue == 'All Requests' || deviceValue == 'جميع الطلبات') {
      this.dataSourceAll.filter = '';
      if (this.userLang == 'arabic') {
        this.CustomerRequestType = 'جميع الطلبات';
      } else {
        this.CustomerRequestType = 'All Requests';
      }
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
    // if (this.selectedRequestType === 0) {
      this.spinner.show();
      this.customerRequestService.getFilteredRequestsByDate(this.fromDate, this.toDate).subscribe((res) => {
        console.log(res);
        if (res.message) {
          this.dataSourceAll = new MatTableDataSource<any>(null);
          this.showMessage = true;
          this.disableReset = true;
          this.disableSearch = false;
          this.profileService.showErrorToastr(res.message);
          this.spinner.hide();
        } else {
          this.allFilterRequests = [];
          this.allFilterRequests = res.result;
          filterRequestData.length = 0;
          // console.log('allFilterRequests', this.allFilterRequests);
          this.allFilterRequests.forEach(element => {
            filterRequestData.push(element);
            element.date = moment(element.createdAt).format('LL');
            element.arDate = moment(element.createdAt).locale('ar-sa').format('LL');
            element.price = element.totalPaybackAmount + element.delieveryFees + ' SAR';
            element.arPrice = element.totalPaybackAmount + element.delieveryFees + ' ريال سعودي ';
            element.enStatus = this.requestTypes[element.type].type;
            element.arStatus = this.requestTypes[element.type].arType;
          });
          // if (this.dataSourceAll.filteredData.length == 0) {
          //   this.showMessage = true;
          // } else {
          //   this.showMessage = false;
          // }
          this.dataSourceAll = new MatTableDataSource<any>(filterRequestData);
          this.dataSourceAll.paginator = this.paginator;
          this.dataSourceAll.sort = this.sort;
          // this.dataSourceAll.data = filterRequestData;
          this.spinner.hide();
          this.showMessage = false;
          this.disableReset = true;
          this.disableSearch = false;
        }
      }, err => {
        this.spinner.hide();
        console.log(' ERROR:', err);
      });
    // } else {
    //   this.spinner.show();
    //   this.customerRequestService.getFilteredRequestsByTypeAndDate(this.selectedRequestType, this.fromDate, this.toDate)
    //     .subscribe((res) => {
    //       if (res.message) {
    //         this.dataSourceAll = new MatTableDataSource<any>(null);
    //         this.showMessage = true;
    //         this.disableReset = true;
    //         this.disableSearch = false;
    //         this.showErrorToast('', res.message, 'error');
    //         this.spinner.hide();
    //       } else {
    //         this.allFilterRequests = [];
    //         this.allFilterRequests = res.result;
    //         filterRequestData.length = 0;
    //         console.log('allFilterRequests', this.allFilterRequests);
    //         this.allFilterRequests.forEach(element => {
    //           filterRequestData.push(element);
    //           element.date = moment(element.createdAt).format('LL');
    //           element.price = element.totalPaybackAmount + ' SAR';
    //           element.status = this.requestTypes[element.type].type;
    //         });
    //         // if (this.dataSourceAll.filteredData.length == 0) {
    //         //   this.showMessage = true;
    //         // } else {
    //         //   this.showMessage = false;
    //         // }
    //         this.dataSourceAll.data = filterRequestData;
    //         this.showMessage = false;
    //         this.spinner.hide();
    //         this.disableReset = true;
    //         this.disableSearch = false;
    //       }
    //     }, err => {
    //       this.spinner.hide();
    //       console.log(' ERROR:', err);
    //     });

    // }
  }
  resetPage() {
    this.ngOnInit();
    this.dataSourceAll.filter = '';
    this.dataSourceAll.data = allCustomerRequestData;
    this.CustomerRequestType = 'All Requests';
    this.fromDate = '';
    this.toDate = '';
    this.disableSearch = false;
    this.disableReset = false;
  }

}
