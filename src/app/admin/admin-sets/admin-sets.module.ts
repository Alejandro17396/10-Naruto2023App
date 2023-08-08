import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSetsRoutingModule } from './admin-sets-routing.module';
import { LayoutAdminSetsComponent } from './layout-admin-sets/layout-admin-sets.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutAdminSetsComponent
  ],
  imports: [
    CommonModule,
    AdminSetsRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminSetsModule { }
