import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NinjaListComponent } from './pages/ninja-list/ninja-list.component';
import { LayoutNinjasComponent } from './pages/layout-ninjas/layout-ninjas.component';
import { NinjaCompareComponent } from './pages/ninja-compare/ninja-compare.component';
import { CreateOwnNinjaComponent } from './pages/create-own-ninja/create-own-ninja.component';
import { ViewOwnNinjasComponent } from './pages/view-own-ninjas/view-own-ninjas.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutNinjasComponent,
    children:[
      { path:'list',component:NinjaListComponent },
      { path:'NinjasComparator', component:NinjaCompareComponent},
      { path:'createOwnNinjas',component:CreateOwnNinjaComponent},
      { path:'viewOwnNinjas',component:ViewOwnNinjasComponent},
      { path:'**', redirectTo:'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NinjaRoutingModule { }
