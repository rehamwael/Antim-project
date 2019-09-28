import { Component, OnInit ,OnDestroy} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  name: string;
  date: string;
  value: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing'},
  {position: 2,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject'},
  {position: 3,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Closed'},
  {position: 4,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject'},
  {position: 5,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review'},
  {position: 6,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval'},
  {position: 7,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject'},
  {position: 8,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review'},
  {position: 9,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval'},
  {position: 10,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Closed'},
  {position: 11,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing'},
  {position: 12,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review'},
  {position: 13,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval'},
  {position: 14,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing'},
  {position: 15,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject'},
  {position: 16,name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing'},

];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements OnInit ,OnDestroy{
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  requestType: string ="All Requests";
  slectedProduct : boolean = false;

  constructor() { }
  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('requests');

  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('requests');

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
    if(deviceValue == ""){
      this.requestType = "All Requests";
    }

  }
  openProductDetails(row){
    console.log(row);
    this.slectedProduct = true;
  }
  closeProductDetails(){
    this.slectedProduct = false;

  }
}
