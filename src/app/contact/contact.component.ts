import { Component, OnInit ,OnDestroy ,HostListener} from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {latLng, tileLayer} from "leaflet";

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

  constructor(private fb: FormBuilder) { 
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
        { maxZoom:7 , attribution: '...'})];
      this.mapCenter = latLng(64.805606, 9.910027);
      this.zoomLevel=5;
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
