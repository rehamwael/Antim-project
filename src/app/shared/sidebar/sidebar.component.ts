import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  public href = '';
  public userType = '';
  public requestUrl = '';
  public dashboredUrl = '';
  public profileUrl = '';
  public notificationUrl = '';

  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.href = this.router.url;
    const x = this.href.split('/')[1].split('-');
    this.userType = x[1];
    this.requestUrl = 'requests-' + this.userType;
    this.dashboredUrl = 'dashbored-' + this.userType;
    this.profileUrl = 'profile-' + this.userType;
    this.notificationUrl = 'notification-' + this.userType;

  }
  logout() {
    console.log('logout.');
    this.authservice.logout().subscribe( (res) => {
      this.router.navigate(['/login']);
    }, async err => {
        console.log('Errrrrror : ', err);
    });

  }
}

