import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsRoutingModule } from './formations-routing.module';
import { LayoutFormationComponent } from './pages/layout-formation/layout-formation.component';
import { FormationsCompareComponent } from './pages/formations-compare/formations-compare.component';
import { FormationsListComponent } from './pages/formations-list/formations-list.component';
import { CreateUserFormationComponent } from './pages/create-user-formation/create-user-formation.component';
import { ViewUserFormationComponent } from './pages/view-user-formation/view-user-formation.component';
import { ShowFormationComponent } from './pages/show-formation/show-formation.component';
import { ShowUserFormationComponent } from './pages/show-user-formation/show-user-formation.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterFormationsPanelComponent } from './pages/filter-formations-panel/filter-formations-panel.component';
import { CompareFormationsListPanelComponent } from './pages/compare-formations-list-panel/compare-formations-list-panel.component';
import { ViewFormationsDifferencesComponent } from './pages/view-formations-differences/view-formations-differences.component';
import { ShowNinjaUserFormationPanelComponent } from './pages/show-ninja-user-formation-panel/show-ninja-user-formation-panel.component';
import { ShowUserFormationCreateComponent } from './pages/show-user-formation-create/show-user-formation-create.component';
import { SaveModifyNinjaUserComponent } from './pages/save-modify-ninja-user/save-modify-ninja-user.component';
import { SaveModifyNinjaUserShowComponent } from './pages/save-modify-ninja-user-show/save-modify-ninja-user-show.component';
import { ConfirmDialogAddFormationComponent } from './pages/confirm-dialog-add-formation/confirm-dialog-add-formation.component';


@NgModule({
  declarations: [
    LayoutFormationComponent,
    FormationsCompareComponent,
    FormationsListComponent,
    CreateUserFormationComponent,
    ViewUserFormationComponent,
    ShowFormationComponent,
    ShowUserFormationComponent,
    FilterFormationsPanelComponent,
    CompareFormationsListPanelComponent,
    ViewFormationsDifferencesComponent,
    ShowNinjaUserFormationPanelComponent,
    ShowUserFormationCreateComponent,
    SaveModifyNinjaUserComponent,
    SaveModifyNinjaUserShowComponent,
    ConfirmDialogAddFormationComponent
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormationsModule { }
