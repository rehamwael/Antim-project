import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  public href: string = "";
  public userType: string = "";
  public requestUrl: string = "";
  public dashboredUrl: string = "";
  public profileUrl: string = "";
  public notificationUrl: string = "";

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
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.href = this.router.url;
    let x = this.href.split("-");
    this.userType = x[1];
    this.requestUrl = "requests-" + this.userType;
    this.dashboredUrl = "dashbored-" + this.userType;
    this.profileUrl = "profile-" + this.userType;
    this.notificationUrl = "notification-" + this.userType;

    
  }
}
