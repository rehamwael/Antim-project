import { Component, OnInit } from '@angular/core';
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

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private profileService: ProfileService,
    ) {
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
  }
  Subscribe() {
    this.notificationsService.SubscribeUser(this.email).subscribe(res => {
      this.profileService.showSuccessToastr(res);
    }, err => {
      this.profileService.showErrorToastr(err.error.message);
      console.log(err);
    });
  }

}
