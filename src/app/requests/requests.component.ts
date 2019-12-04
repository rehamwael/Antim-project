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
  editTotalPriceWithProfit: number;
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
  disableButton1 = false;
  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  slectedProduct = false;
  productStatus: any;
  index: any;
  options: IndividualConfig;
  allRequestData: any;
  allData: boolean;
  editedProducts: any = [];

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
          if (element.type === 1) {
            element.status = 'Waiting for approval';
          }
          if (element.type === 2) {
            element.status = 'Closed';
          }
          if (element.type === 4) {
            element.status = 'Ongoing';
          }
          if (element.type === 3) {
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
    this.index = allCustomerRequestData.findIndex(x => x.id === row.id);
    this.reqID = row.id;
    this.productName = row.name;
    this.totalPrice = row.totalFundAmount;
    this.editTotalPriceWithProfit = row.totalPaybackAmount;
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
      this.installmentPeriod_ENUM = 1;
    }
    if (row.paybackPeriod === 2) {
      this.showOptions = false;
      this.installmentPeriod = '6-Months';
      this.installmentPeriod_ENUM = 2;
    }
    if (row.paybackPeriod === 3) {
      this.showOptions = true;
      this.installmentPeriod = '9-Months';
      this.installmentPeriod_ENUM = 3;
    }
    if (row.paybackPeriod === 4) {
      this.showOptions = true;
      this.installmentPeriod = '12-Months';
      this.installmentPeriod_ENUM = 4;
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
    this.clearData();
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
  inputPrice1(event) {
    this.editRequestForm.get('InstallmentPeriod').enable();
    const price = event.target.value;
    this.price1 = price;
    if (this.link2) {
      this.totalPrice = +this.price1 + +this.price2;
      if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
        this.showOptions = false;
      } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
        this.showOptions = true;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
      }
    }
    if (this.link2 && this.link3) {
      this.totalPrice = +this.price1 + +this.price2 + +this.price3;
      if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
        this.showOptions = false;
      } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
        this.showOptions = true;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
      }
    } else {
      if (this.price1 >= 200 || this.price1 <= 10000) {
        this.totalPrice = this.price1;
        if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
          this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
          this.showOptions = false;
        } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
          this.showOptions = true;
          this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
        }
      }
    }
  }
  inputPrice2(event) {
    this.editRequestForm.get('InstallmentPeriod').enable();
    const price = event.target.value;
    this.price2 = price;
    if (this.link3) {
      this.totalPrice = +this.price1 + +this.price2 + +this.price3;
      if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
        this.showOptions = false;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
      } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
        this.showOptions = true;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
      }
    } else {
      if (this.price2 >= 200 || this.price2 <= 10000) {
        this.totalPrice = +price + +this.price1;
        if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
          this.showOptions = false;
          this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
        } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
          this.showOptions = true;
          this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
        }
      }
    }
  }
  inputPrice3(event) {
    this.editRequestForm.get('InstallmentPeriod').enable();
    const price = event.target.value;
    this.price3 = price;
    this.totalPrice = +this.price1 + +this.price2 + +this.price3;
    if (price >= 200 && price <= 10000) {
      this.totalPrice = +this.price1 + +this.price2 + +this.price3;
      if (this.totalPrice >= 500 && this.totalPrice <= 5000) {
        this.showOptions = false;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 25) / 100);
      } else if (this.totalPrice >= 5000 && this.totalPrice <= 10000) {
        this.showOptions = true;
        this.editTotalPriceWithProfit = +this.totalPrice + +((this.totalPrice * 15) / 100);
      }
    }
  }


  onSelectChange(Value) {
    // console.log(this.monthlyInstallment, this.editTotalPriceWithProfit);
    if (Value === '3-Months') {
      this.installmentPeriod_ENUM = 1;
      this.monthlyInstallment = this.editTotalPriceWithProfit / 3;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '6-Months') {
      this.installmentPeriod_ENUM = 2;
      this.monthlyInstallment = this.editTotalPriceWithProfit / 6;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '9-Months') {
      this.installmentPeriod_ENUM = 3;
      this.monthlyInstallment = this.editTotalPriceWithProfit / 9;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
    if (Value === '12-Months') {
      this.installmentPeriod_ENUM = 4;
      this.monthlyInstallment = this.editTotalPriceWithProfit / 12;
      this.monthlyInstallment = Math.round(this.monthlyInstallment);
    }
  }

  editRequestInfo() {
    this.enableSaveButton = true;
    this.editRequestForm.get('ProductName').enable();
    this.editRequestForm.get('Link1').enable();
    this.editRequestForm.get('Link2').enable();
    this.editRequestForm.get('Link3').enable();
    this.editRequestForm.get('Price1').enable();
    this.editRequestForm.get('Price2').enable();
    this.editRequestForm.get('Price3').enable();
  }
  SaveEditRequestInfo() {
    const Product1 = {
      Price: this.price1,
      ProductUrl: this.link1
    };
    const Product2 = {
      Price: this.price2,
      ProductUrl: this.link2
    };
    const Product3 = {
      Price: this.price3,
      ProductUrl: this.link3
    };
    if (this.link1) {
      this.editedProducts.push(Product1);
    }
    if (this.link1 && this.link2) {
      this.editedProducts.push(Product2);
    }
    if (this.link1 && this.link2 && this.link3) {
      this.editedProducts.push(Product3);
    }
    this.spinner.show();
    this.customerRequestService.EditCustomerRequest({
      'Id': this.reqID,
      'Name': this.productName,
      'TotalFundAmount': this.totalPrice,
      'PaybackPeriod': this.installmentPeriod_ENUM,
      'MonthlyPaybackAmount': this.monthlyInstallment,
      'TotalPaybackAmount': this.editTotalPriceWithProfit,
      'Products': this.editedProducts
    }).subscribe((res) => {
      console.log(' Edited result:', res);
      this.spinner.hide();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.enableSaveButton = false;
      this.editRequestForm.get('InstallmentPeriod').disable();
      this.editRequestForm.get('ProductName').disable();
      this.editRequestForm.get('Link1').disable();
      this.editRequestForm.get('Link2').disable();
      this.editRequestForm.get('Link3').disable();
      this.editRequestForm.get('Price1').disable();
      this.editRequestForm.get('Price2').disable();
      this.editRequestForm.get('Price3').disable();
      allCustomerRequestData[this.index].name = this.productName;
      allCustomerRequestData[this.index].value = this.editTotalPriceWithProfit + 'SAR';
      this.dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
    }, err => {
      console.log(' ERROR:', err);
      this.spinner.hide();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }
  clearData() {
    this.editRequestForm.reset();
    this.link1 = '';
    this.link2 = '';
    this.link3 = '';
    this.price1 = null;
    this.price2 = null;
    this.price3 = null;
    this.productName = '';
    this.reqID = '';
    this.totalPrice = null;
    this.totalPriceWithProfit = null;
    this.editTotalPriceWithProfit = null;
    this.monthlyInstallment = null;
    this.installmentPeriod = '';
    this.installmentPeriod_ENUM = null;
    this.requestDate = '';
    this.productStatus = '';
  }
}
