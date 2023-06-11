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
import { ShowAccesoriesComponent } from './pages/show-accesories/show-accesories.component';
import { ViewAccesorieSetDifferencesComponent } from './pages/view-accesorie-set-differences/view-accesorie-set-differences.component';
import { CreateOwnAccesoriesSetComponent } from './pages/create-own-accesories-set/create-own-accesories-set.component';
import { ConfirmDialogAccesorieSetComponent } from './pages/confirm-dialog-accesorie-set/confirm-dialog-accesorie-set.component';
import { CompareAcesorieSetDialogComponent } from './pages/compare-acesorie-set-dialog/compare-acesorie-set-dialog.component';


@NgModule({
  declarations: [
    ListAccesoriesComponent,
    CompareAccesoriesComponent,
    CreateOwnAccesoriesComponent,
    ViewOwnAccesoriesComponent,
    LayoutAccesoriesComponent,
    ShowAccesoriesComponent,
    ViewAccesorieSetDifferencesComponent,
    CreateOwnAccesoriesSetComponent,
    ConfirmDialogAccesorieSetComponent,
    CompareAcesorieSetDialogComponent
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
