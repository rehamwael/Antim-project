import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestsComponent } from './requests/requests.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboredLenderComponent } from './dashbored-lender/dashbored-lender.component';
import { RequestLenderComponent } from './request-lender/request-lender.component';
import { ProfileLenderComponent } from './profile-lender/profile-lender.component';
import { NotificationLenderComponent } from './notification-lender/notification-lender.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { LenderInfoComponent } from './lender-info/lender-info.component';
import { BorrowerInfoComponent } from './borrower-info/borrower-info.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CustomerRequestDetailsComponent } from './customer-request-details/customer-request-details.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: './starter/starter.module#StarterModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'who-we-are',
        component: WhoWeAreComponent
      },
      {
        path: 'dashbored-customer',
        component: DashboredComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }
      },
      {
        path: 'createorder-customer',
        component: CreateOrderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }

      },
      {
        path: 'profile-customer',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }
      },
      {
        // path: 'requests-customer/:type',
        path: 'requests-customer',
        component: RequestsComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }
      },
      {
        path: 'requests-customer/:id',
        component: CustomerRequestDetailsComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }
      },
      {
        path: 'notification-customer',
        component: NotificationComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['customer'] }
      },
      {
        path: 'dashbored-funder',
        component: DashboredLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['funder'] }
      },
      {
        // path: 'requests-funder/:type',
        path: 'requests-funder',
        component: RequestLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['funder'] }
      } ,
      {
        path: 'profile-funder',
        component: ProfileLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['funder'] }
      },
      {
        path: 'notification-funder',
        component: NotificationLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['funder'] }
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent
      },
      {
        path: 'lender-info',
        component: LenderInfoComponent
      },
      {
        path: 'borrower-info',
        component: BorrowerInfoComponent
      },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      }

    ]
  },
  // {
  //   path: '**',
  //   redirectTo: '/home'
  // }
  { path: '**', component: PageNotFoundComponent }
];
