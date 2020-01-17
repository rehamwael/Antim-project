import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  zoom: number;
  center: L.LatLng;
  fitBounds: L.LatLngBounds;
  baseLayers: L.TileLayer[];
  leafletLayers;
  userLang: any;
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  contactForm: FormGroup;
  disabledSubmitButton = true;
  optionsSelect: Array<any>;
  leafletOptions;
  mapCenter;
  zoomLevel;
  name: any;
  email: any;
  mobile: any;
  messageType = 0;
  message: any;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) {

    this.contactForm = fb.group({
      'contactFormName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'contactFormEmail': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
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
      translate.addLangs([ 'english' , 'arabic']);
      this.translate.onLangChange.subscribe((event) => {
        this.userLang=event.lang;
      });

  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('contact');
    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
  }
  // onSubmit() {
  //     this.contactForm.reset();
  //     this.disabledSubmitButton = true;
  // }
  sendMessage() {
    this.spinner.show();
    this.profileService.contactUs({
      'Name': this.name,
      'Email': this.email,
      // 'PhoneNumber': this.mobile,
      'CommentType': this.messageType,
      'Message': this.message
    }).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.contactForm.reset();
      this.profileService.showSuccessToastr(res);
      this.disabledSubmitButton = true;
    }, err => {
      this.spinner.hide();
      this.profileService.showErrorToastr(err.error.message);
    });
  }

}
