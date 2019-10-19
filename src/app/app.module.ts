// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import {MatRadioModule} from '@angular/material/radio';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';


import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { StickyNavModule } from 'ng2-sticky-nav';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { MatTableModule } from '@angular/material'  ;
import { MatCheckboxModule } from '@angular/material';
import { NotificationComponent } from './notification/notification.component';
import { DashboredLenderComponent } from './dashbored-lender/dashbored-lender.component';
import { RequestLenderComponent } from './request-lender/request-lender.component';
import { ProfileLenderComponent } from './profile-lender/profile-lender.component';
import {MatSliderModule} from '@angular/material/slider';
import { NotificationLenderComponent } from './notification-lender/notification-lender.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { LenderInfoComponent } from './lender-info/lender-info.component';
import { BorrowerInfoComponent } from './borrower-info/borrower-info.component';
import { MatTabsModule } from '@angular/material';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};   

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoginComponent,
    SignUpComponent,
    ContactComponent,
    WhoWeAreComponent,
    DashboredComponent,
    CreateOrderComponent,
    ProfileComponent,
    RequestsComponent,
    NotificationComponent,
    DashboredLenderComponent,
    RequestLenderComponent,
    ProfileLenderComponent,
    NotificationLenderComponent,
    TermsConditionsComponent,
    LenderInfoComponent,
    BorrowerInfoComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatRadioModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    ChartsModule,
    LeafletModule.forRoot(),
    HttpClientModule,
    MatStepperModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatAutocompleteModule, 
	PerfectScrollbarModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    StickyNavModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
	{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
