import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutAdminComponent } from './pages/layout-admin/layout-admin.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SetsModule } from '../sets/sets.module';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';


@NgModule({
  declarations: [
    LayoutAdminComponent,
    UserAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
