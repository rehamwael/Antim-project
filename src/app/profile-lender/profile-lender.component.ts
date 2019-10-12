import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label ,Color } from 'ng2-charts';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-profile-lender',
  templateUrl: './profile-lender.component.html',
  styleUrls: ['./profile-lender.component.css']
})
export class ProfileLenderComponent implements OnInit {
  disabledButton: boolean = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  isShown: boolean = false ; // hidden by default
  disabledBankButton: boolean = true;
  showProfit: boolean = false ; // hidden by default
  public barChartOptions: ChartOptions = {
    responsive: true,
      legend: {
        display: false
      },
    scales: { xAxes: [{
      barPercentage: 0.2
    }], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
  };
  public barChartLabels: Label[] = ['2014', '2016', '2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Total Fund' },
    { data: [28, 48, 40, 19, 86], label: 'Total Profit' }
  ];
 




  constructor(private fb: FormBuilder ,private modalService: NgbModal,public router: Router) { 
    this.EditForm = fb.group({
      'Name': [{value: null, disabled: this.disabledButton}],
      'MobileNo':  [{value: null, disabled: this.disabledButton}],
      'Email':  [{value: null, disabled: this.disabledButton}],
      'NID': [{value: null, disabled: this.disabledButton}],
      'Address': [{value: null, disabled: this.disabledButton}],
      });

      this.BankInfoForm = fb.group({
        'BankName': ['',{disabled:this.disabledBankButton}],
        'BankAccountName': ['',{disabled:this.disabledBankButton}],
        'investmentPerYear': ['',{disabled:this.disabledBankButton}],
        });

  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('investmentPerYear').disable();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('profile');

  }
  formatLabel(value: number) {
      return Math.round(value) + 'SAR';
  }
  EditInfo(){
    this.EditForm.get('Name').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('NID').enable();
    this.EditForm.get('Address').enable();


  }
  SaveInfo(){
    this.EditForm.get('Name').disable();
    this.EditForm.get('MobileNo').disable();
    this.EditForm.get('Email').disable();
    this.EditForm.get('NID').disable();
    this.EditForm.get('Address').disable();
  }
  EditBankInfo(){
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountName').enable();
    this.BankInfoForm.get('investmentPerYear').enable();
  }
  SaveBankInfo(){
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('investmentPerYear').disable();
  }
  onChange(deviceValue) {
      if(deviceValue == "Bank"){
        this.isShown = ! this.isShown;
      }else{
        this.isShown = ! this.isShown;
      }
      if(deviceValue == "TotalProfit"){
        this.showProfit = true;
      }else{
        this.showProfit = false;

      }
  }
  toggleNavbar(){
    window.document.querySelector(".left-sidebar").classList.toggle("showmobile")

  }
  openVerticallyCentered(content3) {
    this.modalService.open(content3, { centered: true });
  }
  public barChartColors: Color[] = [
    { backgroundColor: '#39A4E9' },
    { backgroundColor: '#5C20D2' },
  ]
}

