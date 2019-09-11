import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
  public selectedItem: any;
  disabledNextButton: boolean = true;
  showSelected: boolean;
  sheckMobileStep: boolean;
  lastStep: boolean;
  public id;
  
  constructor(public router: Router) { 
    this.showSelected = false;
    this.sheckMobileStep = false;
    this.lastStep= false;

  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('log-in');
    this.router.navigate(['/signup']);
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('log-in');
  }
  addClass(id: any) {
    this.id = id;
    if(this.disabledNextButton){
      this.disabledNextButton = false;
    }
  }

  Nextstep(){
    this.showSelected = !this.showSelected;
  }
  PrevStep(){
    this.showSelected = !this.showSelected;

  }
  thirdStep(){
    this.sheckMobileStep = !this.sheckMobileStep;

  }
  lastStepd(){
    this.lastStep = !this.lastStep;

  }

}
