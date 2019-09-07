import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {
  subtitle: string;
  constructor(public router: Router) {}


  ngAfterViewInit() {}
  btnClick= function () {
    this.router.navigateByUrl('/signup');
  };
}
