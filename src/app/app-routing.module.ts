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
        path: 'dashbored-Customer',
        component: DashboredComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Customer'] }
      },
      {
        path: 'createorder-Customer',
        component: CreateOrderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Customer'] }

      },
      {
        path: 'profile-Customer',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Customer'] }
      },
      {
        path: 'requests-Customer/:type',
        component: RequestsComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Customer'] }
      },
      {
        path: 'notification-Customer',
        component: NotificationComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Customer'] }
      },
      {
        path: 'dashbored-Funder',
        component: DashboredLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Funder'] }
      },
      {
        path: 'requests-Funder/:type',
        component: RequestLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Funder'] }
      } ,
      {
        path: 'profile-Funder',
        component: ProfileLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Funder'] }
      },
      {
        path: 'notification-Funder',
        component: NotificationLenderComponent,
        canActivate: [AuthGuard],
        data: { userRole: ['Funder'] }
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
      }

    ]
  },
  // {
  //   path: '**',
  //   redirectTo: '/home'
  // }
  { path: '**', component: PageNotFoundComponent }
];
