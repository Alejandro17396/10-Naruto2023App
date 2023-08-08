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
import { AdminModule } from '../admin/admin.module';
import { DeleteEquipmentComponent } from './pages/admin/delete-equipment/delete-equipment.component';
import { NewEquipmentComponent } from './pages/admin/new-equipment/new-equipment.component';
import { UpdateEquipmentComponent } from './pages/admin/update-equipment/update-equipment.component';
import { ViewEquipmentsComponent } from './pages/admin/view-equipments/view-equipments.component';
import { AdminFilterBonusAttributePanelComponent } from './pages/admin-filter-bonus-attribute-panel/admin-filter-bonus-attribute-panel.component';





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
    CompareSetsDialogComponent,
    NewEquipmentComponent,
    DeleteEquipmentComponent,
    UpdateEquipmentComponent,
    ViewEquipmentsComponent,
    AdminFilterBonusAttributePanelComponent
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
    ReactiveFormsModule,
    AdminModule
  ]
})
export class SetsModule { }
