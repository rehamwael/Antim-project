import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  id?: string;
}

let allCustomerRequestData: PeriodicElement[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit, OnDestroy {
  productName: any;
  reqID: any;
  link1: any;
  link2: any;
  link3: any;
  price1: number;
  price2: number;
  price3: number;
  totalPrice: number;
  totalPriceWithProfit: number;
  monthlyInstallment: number;
  installmentPeriod: any;
  installmentPeriod_ENUM: number;
  requestDate: any;
  editRequestForm: FormGroup;
  showSecondLinkPriceRow = false;
  showThirdLinkPriceRow = false;
  enableSaveButton = false;
  showOptions = false;
  editFields = false;
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  slectedProduct = false;
  productStatus: any;
  options: IndividualConfig;
  allRequestData: any;
  allData: boolean;
  editedProducts: any = [];
  Product1 = {
    Price: this.price1,
    ProductUrl: this.link1
  };
  Product2 = {
    Price: this.price2,
    ProductUrl: this.link2
  };
  Product3 = {
    Price: this.price3,
    ProductUrl: this.link3
  };
  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
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
          if (element.type === 5) {
            element.status = 'Draft';
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
      this.editRequestForm = this._formBuilder.group({
        Link1: ['', [
          Validators.required,
        ]],
        Link2: [''],
        Link3: [''],
        ProductName: ['', [
          Validators.required,
        ]],
        Price1: [null, Validators.compose([
          Validators.required
        ])],
        Price2: [''],
        Price3: [''],
        RequestDate: [''],
        TotalAmount: [''],
        installmentPeriod: [{ value: '', disabled: true }],
        InstallmentPeriod: [{ value: '', disabled: true }],
        MonthlyInstallment: [''],
        FundingAmount: [''],
        RequestStatus: [''],
      });
      this.editRequestForm.get('InstallmentPeriod').disable();

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
  onSelectChange(Value) {
    if (Value === '3-Months') {
      this.installmentPeriod_ENUM = 1;
      this.monthlyInstallment = this.totalPriceWithProfit / 3;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '6-Months') {
      this.installmentPeriod_ENUM = 2;
      this.monthlyInstallment = this.totalPriceWithProfit / 6;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '9-Months') {
      this.installmentPeriod_ENUM = 3;
      this.monthlyInstallment = this.totalPriceWithProfit / 9;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '12-Months') {
      this.installmentPeriod_ENUM = 4;
      this.monthlyInstallment = this.totalPriceWithProfit / 12;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (this.totalPrice < 500 || this.totalPrice > 10000) {
    }
  }
  calculateProfit() {
    return new Promise((resolve, reject) => {
      if (this.link1) {
        this.editedProducts.push(this.Product1);
      }
      if (this.link1 && this.link2) {
        this.editedProducts.push(this.Product2);
      }
      if (this.link1 && this.link2 && this.link3) {
        this.editedProducts.push(this.Product3);
      }
      if (!this.link2) {
        this.price2 = 0;
      }
      if (!this.link3) {
        this.price3 = 0;
      }
      this.totalPrice = this.price1 + this.price2 + this.price3;
      console.log('totalPrice:', this.totalPrice);
      if (this.totalPrice <= 500 || this.totalPrice >= 10000) {
        // tslint:disable-next-line: max-line-length
        this.showErrorToast('Error!!', 'Total Product Price must be greater than 500 and less than 10000, Please Enter correct price.', 'error');
      }
      if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
        this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 25) / 100);
        // console.log('totalPriceWithProfit:', this.totalPriceWithProfit);
      } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
        this.totalPriceWithProfit = this.totalPrice + ((this.totalPrice * 15) / 100);
        // console.log('totalPriceWithProfit:', this.totalPriceWithProfit);
      }
      resolve();
    });
  }
  editRequestInfo() {
    this.totalPrice = this.price1 + this.price2 + this.price3;
    this.enableSaveButton = true;
    this.editRequestForm.get('Link1').enable();
    this.editRequestForm.get('Link2').enable();
    this.editRequestForm.get('Link3').enable();
    this.editRequestForm.get('Price1').enable();
    this.editRequestForm.get('Price2').enable();
    this.editRequestForm.get('Price3').enable();
    this.editRequestForm.get('InstallmentPeriod').enable();
  }
  SaveEditRequestInfo() {
    this.calculateProfit().then(e => {
      this.spinner.show();
      this.customerRequestService.EditCustomerRequest({
        'Id': this.reqID,
        'Name': this.productName,
        'TotalFundAmount': this.totalPrice,
        'PaybackPeriod': this.installmentPeriod_ENUM,
        'MonthlyPaybackAmount': this.monthlyInstallment,
        'TotalPaybackAmount': this.totalPriceWithProfit,
        'Type': 'Draft',
        'Products': this.editedProducts
      }).subscribe((res) => {
        console.log(' Edited result:', res);
        this.spinner.hide();
        this.showSuccessToast('OK!!', res.message, 'success');
        this.enableSaveButton = false;
        // this.modalService.open(content, { centered: true });
      }, err => {
        console.log(' ERROR:', err);
        this.spinner.hide();
        this.showErrorToast('Error!!', err.error.message, 'error');
      });
    });
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
    if (deviceValue === 'Draft') {
      this.requestType = 'Draft';
    }
  }
  openProductDetails(row) {
    this.reqID = row.id;
    this.productName = row.name;
    this.totalPrice = row.totalFundAmount;
    console.log('PRICE: ', this.totalPrice);
    if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
    this.spinner.show();
    console.log('REQUEST DEATAILS: ', row);
    this.productStatus = row.status;
    if (this.productStatus === 'Draft' || this.productStatus === 'Waiting for approval') {
      this.editFields = true;
    }
    if (this.productStatus === 'Ongoing' || this.productStatus === 'Rejected' || this.productStatus === 'Closed') {
      this.editFields = false;
    }

    if (row.paybackPeriod === 1) {
      this.showOptions = false;
      this.installmentPeriod = '3-Months';
    }
    if (row.paybackPeriod === 2) {
      this.showOptions = false;
      this.installmentPeriod = '6-Months';
    }
    if (row.paybackPeriod === 3) {
      this.showOptions = true;
      this.installmentPeriod = '9-Months';
    }
    if (row.paybackPeriod === 4) {
      this.showOptions = true;
      this.installmentPeriod = '12-Months';
    }
    this.customerRequestService.getRequestDataById(row.id)
      // tslint:disable-next-line: deprecation
      .subscribe(res => {
        // console.log('REQUEST DETAILS: ' , res.result);
        this.link1 = res.result.customerRequestProducts[0].productUrl;
        this.price1 = res.result.customerRequestProducts[0].amount;
        if (res.result.customerRequestProducts[1]) {
          this.link2 = res.result.customerRequestProducts[1].productUrl;
          this.price2 = res.result.customerRequestProducts[1].amount;
          this.showSecondLinkPriceRow = true;
        }
        if (res.result.customerRequestProducts[2]) {
          this.link3 = res.result.customerRequestProducts[2].productUrl;
          this.price3 = res.result.customerRequestProducts[2].amount;
          this.showThirdLinkPriceRow = true;
        }
        this.spinner.hide();
      });

    this.totalPriceWithProfit = row.value;
    this.requestDate = row.date;
    this.monthlyInstallment = row.monthlyPaybackAmount;

    this.slectedProduct = true;
  }
  closeProductDetails() {
    this.editRequestForm.get('InstallmentPeriod').disable();
    this.showOptions = false;
    this.editFields = false;
    this.showSecondLinkPriceRow = false;
    this.showThirdLinkPriceRow = false;
    this.slectedProduct = false;
  }
  openDeletePopup(content) {
    this.modalService.open(content, { centered: true });
  }

  deleteRequest() {
    this.spinner.show();
    this.customerRequestService.deleteCustomerRequest(this.reqID).subscribe(res => {
      allCustomerRequestData = allCustomerRequestData.filter(request => {
        return request.id !== this.reqID;
      });
      this.dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.modalService.dismissAll();
      this.closeProductDetails();
    }, err => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.showErrorToast('Error!!', err.message, 'error');
    });
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
}
