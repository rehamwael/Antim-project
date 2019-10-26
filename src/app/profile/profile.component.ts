import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import {latLng, tileLayer} from "leaflet";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit ,OnDestroy{
  disabledButton: boolean = true;
  EditForm: FormGroup;
  BankInfoForm: FormGroup;
  isShown: boolean = false ; // hidden by default
  disabledBankButton: boolean = true;
  zoom: number;
  center: L.LatLng;
  fitBounds: L.LatLngBounds;
  baseLayers: L.TileLayer[];
  leafletLayers;
  leafletOptions;
  mapCenter;
  zoomLevel;



  constructor(private fb: FormBuilder,public router: Router) { 
    this.EditForm = fb.group({
      'Name': [{value: null, disabled: this.disabledButton}],
      'MobileNo':  [{value: null, disabled: this.disabledButton}],
      'Email':  [{value: null, disabled: this.disabledButton}],
      'NID': [{value: null, disabled: this.disabledButton}],
      'Address': [{value: null, disabled: this.disabledButton}],
      });

      this.BankInfoForm = fb.group({
        'BankName': ['',{disabled:this.disabledBankButton}],
        'BankAccountName': ['',{disabled:this.disabledBankButton}],
        'EmailAdd': ['',{disabled:this.disabledBankButton}],
        'Iqama': ['',{disabled:this.disabledBankButton}],
        });
        this.leafletLayers = [tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { })];
        this.mapCenter = latLng(24.8085046, 46.6711241);
        this.zoomLevel=7;
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('dashbored');
    body.classList.add('profile');
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('EmailAdd').disable();
    this.BankInfoForm.get('Iqama').disable();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('dashbored');
    body.classList.remove('profile');

  }
  EditInfo(){
    this.EditForm.get('Name').enable();
    this.EditForm.get('MobileNo').enable();
    this.EditForm.get('Email').enable();
    this.EditForm.get('NID').enable();
    this.EditForm.get('Address').enable();


  }
  SaveInfo(){
    this.EditForm.get('Name').disable();
    this.EditForm.get('MobileNo').disable();
    this.EditForm.get('Email').disable();
    this.EditForm.get('NID').disable();
    this.EditForm.get('Address').disable();
  }
  EditBankInfo(){
    this.BankInfoForm.get('BankName').enable();
    this.BankInfoForm.get('BankAccountName').enable();
    this.BankInfoForm.get('EmailAdd').enable();
    this.BankInfoForm.get('Iqama').enable();
  }
  SaveBankInfo(){
    this.BankInfoForm.get('BankName').disable();
    this.BankInfoForm.get('BankAccountName').disable();
    this.BankInfoForm.get('EmailAdd').disable();
    this.BankInfoForm.get('Iqama').disable();
  }
  onChange(deviceValue) {
      if(deviceValue == "Bank"){
        this.isShown = ! this.isShown;
      }else{
        this.isShown = ! this.isShown;
      }
  }
  toggleNavbar(){
    window.document.querySelector(".left-sidebar").classList.toggle("showmobile")

  }
}
