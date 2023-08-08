import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminNinjasRoutingModule } from './admin-ninjas-routing.module';
import { LayoutAdminNinjasComponent } from './layout-admin-ninjas/layout-admin-ninjas.component';


@NgModule({
  declarations: [
    LayoutAdminNinjasComponent
  ],
  imports: [
    CommonModule,
    AdminNinjasRoutingModule
  ]
})
export class AdminNinjasModule { }
