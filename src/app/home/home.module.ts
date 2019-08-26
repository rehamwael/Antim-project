import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Home Page' }
      ]
    },
    component: HomeComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent]
})
export class HomeModule {}
