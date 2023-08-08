import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAccesoriesRoutingModule } from './admin-accesories-routing.module';
import { LayoutAdminAccesoriesComponent } from './layout-admin-accesories/layout-admin-accesories.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutAdminAccesoriesComponent
  ],
  imports: [
    CommonModule,
    AdminAccesoriesRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminAccesoriesModule { }
