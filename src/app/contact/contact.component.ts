import { Component, OnInit ,OnDestroy ,HostListener} from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {latLng, tileLayer} from "leaflet";
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit ,OnDestroy{
  zoom: number;
  center: L.LatLng;
  fitBounds: L.LatLngBounds;
  baseLayers: L.TileLayer[];
  leafletLayers;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      }
  }
  userLang: any;
  

  constructor(private fb: FormBuilder ,private router: Router , public translate: TranslateService) { 
    this.contactForm = fb.group({
      'contactFormName': ['', Validators.required],
      'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      'contactFormCopy': [''],
      'contactFormPhone': ['', Validators.required]
      });
      this.leafletLayers = [tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { })];
      this.mapCenter = latLng(24.8085046, 46.6711241);
      this.zoomLevel=10;
      this.translate.onLangChange.subscribe((event) => {
        this.userLang=event.lang;
        console.log(this.userLang); 
      });
  }
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  leafletOptions;
  mapCenter;
  zoomLevel;

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    window.dispatchEvent(new Event('resize'));
  }
  ngOnDestroy(): void{
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
  }
  onSubmit() {
      this.contactForm.reset();
      this.disabledSubmitButton = true;
  }



}
