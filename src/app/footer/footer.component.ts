import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../services/notifications.service';
import { ProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  userLang: any;
  email: any;
  SubscribeForm: FormGroup;
  disableButton = false;
  facebook: any;
  twitter: any;
  instagram: any;
  configData: any;

  @HostListener('input') oninput() {
    if (this.SubscribeForm.valid) {
      this.disableButton = true;
    }
  }

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private profileService: ProfileService,
    ) {
      this.userLang = this.translate.currentLang;
    translate.addLangs([ 'english' , 'arabic']);
      this.translate.onLangChange.subscribe((event) => {
        this.userLang = event.lang;
      });
      this.SubscribeForm = formBuilder.group({
        'email': [null, Validators.compose([
          Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
        ])],
        });

  }

  ngOnInit() {
    this.profileService.getConfigData().subscribe(res => {
      this.configData = res.result;
      this.configData.map(element => {

        if (element.key == 'facebook') {
          this.facebook = element.value;
        }
        if (element.key == 'twitter') {
          this.twitter = element.value;
        }
        if (element.key == 'instagram') {
          this.instagram = element.value;
        }
      });
    }, err => {
      console.log(err);
    });

  }
  Subscribe() {
    this.notificationsService.SubscribeUser(this.email).subscribe(res => {
      this.profileService.showSuccessToastr(res);
      this.email = '';
      this.disableButton = false;
    }, err => {
      this.profileService.showErrorToastr(err.error.message);
      console.log(err);
    });
  }

}
