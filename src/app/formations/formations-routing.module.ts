import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutFormationComponent } from './pages/layout-formation/layout-formation.component';
import { FormationsListComponent } from './pages/formations-list/formations-list.component';
import { FormationsCompareComponent } from './pages/formations-compare/formations-compare.component';
import { CreateUserFormationComponent } from './pages/create-user-formation/create-user-formation.component';
import { ViewUserFormationComponent } from './pages/view-user-formation/view-user-formation.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutFormationComponent,
    children:[
      { path:'generateFormations',component:FormationsListComponent },
      { path:'FormationsComparator', component:FormationsCompareComponent},
      { path:'createOwnFormations',component:CreateUserFormationComponent},
      { path:'viewOwnFormations',component:ViewUserFormationComponent},
      { path:'**', redirectTo:'generateFormations'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsRoutingModule { }
