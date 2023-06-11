import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetsRoutingModule } from './sets-routing.module';
import { SearchSetsComponent } from './pages/search-sets/search-sets.component';
import { LayoutSetsComponent } from './pages/layout-sets/layout-sets.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FilterSetPanelComponent } from './pages/filter-set-panel/filter-set-panel.component';
import { ShowSetComponent } from './pages/show-set/show-set.component';
import { CompareSetsComponent } from './pages/compare-sets/compare-sets.component';
import { ViewSetDifferencesComponent } from './pages/view-set-differences/view-set-differences.component';
import { ViewOwnSetsComponent } from './pages/view-own-sets/view-own-sets.component';
import { CreateOwnSetsComponent } from './pages/create-own-sets/create-own-sets.component';
import { UpdateOwnSetsComponent } from './pages/update-own-sets/update-own-sets.component';
import { ConfirmDialogSetComponent } from './pages/confirm-dialog-set/confirm-dialog-set.component';
import { CompareSetsDialogComponent } from './pages/compare-sets-dialog/compare-sets-dialog.component';




@NgModule({
  declarations: [
    SearchSetsComponent,
    LayoutSetsComponent,
    FilterSetPanelComponent,
    ShowSetComponent,
    CompareSetsComponent,
    ViewSetDifferencesComponent,
    ViewOwnSetsComponent,
    CreateOwnSetsComponent,
    UpdateOwnSetsComponent,
    ConfirmDialogSetComponent,
    CompareSetsDialogComponent
  ],
  exports:[
    SearchSetsComponent,
    LayoutSetsComponent,
    FilterSetPanelComponent
  ],
  imports: [
    CommonModule,
    SetsRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class SetsModule { }
