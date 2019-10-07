import { Component, AfterViewInit ,OnInit
 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit ,OnInit{
  subtitle: string;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
}
  ngAfterViewInit() {}
  btnClick= function () {
    this.router.navigateByUrl('/signup');
  };
}
