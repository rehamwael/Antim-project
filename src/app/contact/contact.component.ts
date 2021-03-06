import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { latLng, tileLayer } from 'leaflet';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from '../services/userProfile.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, staticPagesState } from './../store/app.states';
import { GetContactUsPage } from './../store/actions/static-pages.actions';

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
  messageType = '';
  message: any;
  ContactUsPage: any = {
    page_name: 'Contact Us Page',
    Section1: {
      section_name: 'Contact Us',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section2: {
      section_name: 'Antim Care: Email',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section3: {
      section_name: 'Customers Service: Email',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section4: {
      section_name: 'Customers Service: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section5: {
      section_name: 'From within the Kingdom: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section6: {
      section_name: 'From outside the Kingdom: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },
    Section7: {
      section_name: 'Marketing & Sales: Mobile Number',
      TitleEn: '',
      TitleAr: '',
      ContentEn: '',
      ContentAr: ''
    },

  };
  getState: Observable<any>;

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
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(staticPagesState);
    this.userLang = this.translate.currentLang;
    this.contactForm = fb.group({
      'contactFormName': [null, Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'contactFormEmail': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      'contactFormSubjects': ['', Validators.required],
      'contactFormMessage': ['', Validators.required],
      // 'contactFormCopy': [''],
      // 'contactFormPhone': ['', Validators.required]
    });
    this.leafletLayers = [tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {})];
    this.mapCenter = latLng(24.8085046, 46.6711241);
    this.zoomLevel = 10;
    translate.addLangs(['english', 'arabic']);
    this.translate.onLangChange.subscribe((event) => {
      this.userLang = event.lang;
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

    this.getState.subscribe((state) => {
      if (state.ContactUsPage == null) {
        this.store.dispatch(new GetContactUsPage());
      } else {
        this.ContactUsPage = state.ContactUsPage;
      }
    });

  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('contact');
  }

  sendMessage() {
    this.profileService.contactUs({
      'Name': this.name,
      'Email': this.email,
      // 'PhoneNumber': this.mobile,
      'CommentType': this.messageType,
      'Message': this.message
    }).subscribe((res) => {
      console.log(res);
      this.contactForm.reset();
      this.profileService.showSuccessToastr(res);
      this.disabledSubmitButton = true;
    }, err => {
      this.profileService.showErrorToastr(err.error.message);
    });
  }

}
