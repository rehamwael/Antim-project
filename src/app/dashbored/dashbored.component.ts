import { Component, OnInit ,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit ,OnDestroy{

  constructor() { }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
  }

}
