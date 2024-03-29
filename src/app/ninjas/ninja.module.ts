import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NinjaRoutingModule } from './ninja-routing.module';
import { LayoutNinjasComponent } from './pages/layout-ninjas/layout-ninjas.component';
import { CreateOwnNinjaComponent } from './pages/create-own-ninja/create-own-ninja.component';
import { NinjaCompareComponent } from './pages/ninja-compare/ninja-compare.component';
import { NinjaListComponent } from './pages/ninja-list/ninja-list.component';
import { ViewOwnNinjasComponent } from './pages/view-own-ninjas/view-own-ninjas.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowNinjaComponent } from './pages/show-ninja/show-ninja.component';
import { ViewNinjaDifferencesComponent } from './pages/view-ninja-differences/view-ninja-differences.component';
import { ShowNinjaUserComponent } from './pages/show-ninja-user/show-ninja-user.component';
import { FilterNinjaPanelComponent } from './pages/filter-ninja-panel-component/filter-ninja-panel-component.component';
import { CompareUserNinjasComponent } from './pages/compare-user-ninjas/compare-user-ninjas.component';
import { ViewNinjaUserDifferencesComponent } from './pages/view-ninja-user-differences/view-ninja-user-differences.component';
import { NewNinjaComponent } from './pages/admin/new-ninja/new-ninja.component';
import { UpdateNinjaComponent } from './pages/admin/update-ninja/update-ninja.component';


@NgModule({
  declarations: [
    LayoutNinjasComponent,
    CreateOwnNinjaComponent,
    NinjaCompareComponent,
    NinjaListComponent,
    ViewOwnNinjasComponent,
    ShowNinjaComponent,
    ViewNinjaDifferencesComponent,
    ShowNinjaUserComponent,
    FilterNinjaPanelComponent,
    CompareUserNinjasComponent,
    ViewNinjaUserDifferencesComponent,
    NewNinjaComponent,
    UpdateNinjaComponent
  ],
  exports:[
    LayoutNinjasComponent,
    CreateOwnNinjaComponent,
    NinjaCompareComponent,
    NinjaListComponent,
    ViewOwnNinjasComponent
  ],
  imports: [
    CommonModule,
    NinjaRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NinjaModule { }
