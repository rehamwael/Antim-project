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
        path: 'dashbored',
        component: DashboredComponent

      },
      {
        path: 'create-order',
        component: CreateOrderComponent

      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'requests',
        component: RequestsComponent
      }
      
      
      
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
