import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerRequestService } from '../services/customer-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-request-details',
  templateUrl: './customer-request-details.component.html',
  styleUrls: ['./customer-request-details.component.css']
})
export class CustomerRequestDetailsComponent implements OnInit {

  fromDate = null;
  toDate = null;

  selectedRequestType = 0;
  productName: any;
  reqID: any;
  link1: any;
  price1: number;
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

  productStatus: any;
  index: any;
  options: IndividualConfig;
  allRequestData: any;
  allFilterRequests: any;
  allData: boolean;
  editedProducts: any = [];

  constructor(private modalService: NgbModal,
    private _formBuilder: FormBuilder,
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


  ngOnInit(): void {

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
      // this.router.events.subscribe((evt) => {
      //   if (!(evt instanceof NavigationEnd)) {
      //     return;
      //   }
      //   window.scrollTo(0, 0);
      // });
      const requestTypeParams = this.route.snapshot.paramMap.get('type');
      console.log('requestTypeParams', requestTypeParams);
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }



  closeProductDetails() {
    this.clearData();
    this.editRequestForm.get('InstallmentPeriod').disable();
    this.showOptions = false;
    this.editFields = false;
    this.showSecondLinkPriceRow = false;
    this.showThirdLinkPriceRow = false;
  }
  openDeletePopup(content) {
    this.modalService.open(content, { centered: true });
  }

  deleteRequest() {
    this.spinner.show();
    this.customerRequestService.deleteCustomerRequest(this.reqID).subscribe(res => {
      // allCustomerRequestData = allCustomerRequestData.filter(request => {
      //   return request.id !== this.reqID;
      // });
      // this.dataSourceAll = new MatTableDataSource<PeriodicElement>(allCustomerRequestData);
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
    const price = event.target.value;
    this.price1 = price;
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


  editRequestInfo() {

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
    this.price1 = null;
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
