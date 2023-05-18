import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoriesRoutingModule } from './accesories-routing.module';
import { ListAccesoriesComponent } from './pages/list-accesories/list-accesories.component';
import { CompareAccesoriesComponent } from './pages/compare-accesories/compare-accesories.component';
import { CreateOwnAccesoriesComponent } from './pages/create-own-accesories/create-own-accesories.component';
import { ViewOwnAccesoriesComponent } from './pages/view-own-accesories/view-own-accesories.component';
import { LayoutAccesoriesComponent } from './pages/layout-accesories/layout-accesories.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    ListAccesoriesComponent,
    CompareAccesoriesComponent,
    CreateOwnAccesoriesComponent,
    ViewOwnAccesoriesComponent,
    LayoutAccesoriesComponent
  ],
  imports: [
    CommonModule,
    AccesoriesRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccesoriesModule { }
