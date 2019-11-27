import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-dashbored-lender',
  templateUrl: './dashbored-lender.component.html',
  styleUrls: ['./dashbored-lender.component.css']
})
export class DashboredLenderComponent implements OnInit , OnDestroy {
  currentUser: any;

  constructor(public router: Router, private userDataService: ProfileService) { }

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe(res => {
      this.currentUser = res.result;
      console.log('user:', res.result);
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
