import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
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
  options: IndividualConfig;

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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;

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
      'contactFormPhone': [null, Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])]
    });
    this.leafletLayers = [tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {})];
    this.mapCenter = latLng(24.8085046, 46.6711241);
    this.zoomLevel = 10;
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
      console.log(this.userLang);
    });
  }

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
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  sendMessage() {
    this.spinner.show();
    this.profileService.contactUs({
      'Name': this.name,
      'Email': this.email,
      'PhoneNumber': this.mobile,
      'CommentType': this.messageType,
      'Message': this.message
    }).subscribe((res) => {
      console.log(res);
      this.spinner.hide();
      this.contactForm.reset();
      this.showSuccessToast('OK!!', res.message, 'success');
      this.disabledSubmitButton = true;
    }, err => {
      this.spinner.hide();
      this.showErrorToast('Error!!', err.error.message, 'error');
    });
  }

}
