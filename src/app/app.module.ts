// import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {MatTableModule} from '@angular/material/table';
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
import { SettingComponent } from './shared/setting/setting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AuthenticationEffects } from './store/effects/app.effects';
import { reducers } from './store/app.states';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NumberOnlyDirective } from './number-only.directive';
import { CustomerRequestDetailsComponent } from './customer-request-details/customer-request-details.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FunderRequestsDetailsComponent } from './funder-requests-details/funder-requests-details.component';
import { CountdownModule } from 'ngx-countdown';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
// import {MatSelectModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule, MatSortModule} from '@angular/material';


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
    SettingComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    NumberOnlyDirective,
    CustomerRequestDetailsComponent,
    ConfirmEmailComponent,
    FunderRequestsDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatRadioModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
    // tslint:disable-next-line: deprecation
    NgbModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    StickyNavModule,
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreModule.forRoot(reducers, {}),
    NgxSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    CountdownModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule
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
