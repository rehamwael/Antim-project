import { Component, OnInit , OnDestroy, ElementRef , ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  position?: number;
  name: string;
  date: string;
  value: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
   {name: 'Sony Laptop. ', date: '22 December 2018', value: '1900 SAR', status: 'Ongoing request'},
  {name: 'Aony Laptop. ', date: '23 December 2018', value: '1700 SAR', status: 'Closed'},
  {name: 'Hony Laptop. ', date: '24 December 2018', value: '1100 SAR', status: 'Wating Fund'},
  {name: 'Tony Laptop. ', date: '25 December 2018', value: '1600 SAR', status: 'Wating Fund'},
  {name: 'Sony Laptop. ', date: '27 December 2018', value: '1200 SAR', status: 'Closed'},
  {name: 'Sony Laptop. ', date: '27 December 2018', value: '1700 SAR', status: 'Ongoing request'},
  {name: 'Eony Laptop. ', date: '28 December 2018', value: '1500 SAR', status: 'Wating Fund'},
  {name: 'Sony Laptop. ', date: '29 December 2018', value: '1700 SAR', status: 'Ongoing request'},
  {name: 'Yony Laptop. ', date: '21 December 2018', value: '1600 SAR', status: 'Ongoing request'},
  {name: 'Qony Laptop. ', date: '23 December 2018', value: '1700 SAR', status: 'Rejected'},
  {name: 'Bony Laptop. ', date: '22 December 2018', value: '1800 SAR', status: 'Rejected'},
  {name: 'Dony Laptop. ', date: '26 December 2018', value: '1100 SAR', status: 'Rejected'},
  {name: 'Dony Laptop. ', date: '26 December 2018', value: '1100 SAR', status: 'Closed'},

];

@Component({
  selector: 'app-request-lender',
  templateUrl: './request-lender.component.html',
  styleUrls: ['./request-lender.component.css']
})

export class RequestLenderComponent implements OnInit , OnDestroy {
  @ViewChild('clickMe', {static: false}) clickMe: ElementRef<HTMLElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  displayedColumns: string[] = [ 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType = 'All Requests';
  slectedProduct = false;
  productStatus: any;
  content4: any;


  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');
    if (this.productStatus === 'Wating Fund') {
      this.modalService.open(this.content4, { centered: true });
    }

  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  onChange(deviceValue) {
    this.dataSource.filter = deviceValue;
    this.requestType = deviceValue;
    if (deviceValue === '') {
      this.requestType = 'All Requests';
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
}
