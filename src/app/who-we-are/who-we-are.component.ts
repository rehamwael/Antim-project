import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.css']
})
export class WhoWeAreComponent implements OnInit ,OnDestroy {

  constructor(public router: Router) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
  }
  btnClick= function () {
    this.router.navigateByUrl('/contact');
  };

}
