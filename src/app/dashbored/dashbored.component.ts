import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserDataService } from '../services/userData.service';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit , OnDestroy {
  currentUser: any;

  constructor(public router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe(res => {
      this.currentUser = res;
      console.log('user:', res);
    });

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('dashbored-home');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }
  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('dashbored-home');

  }
  toggleNavbar() {
    window.document.querySelector('.left-sidebar').classList.toggle('showmobile');
  }

}
