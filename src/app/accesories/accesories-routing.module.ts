import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAccesoriesComponent } from './pages/layout-accesories/layout-accesories.component';
import { ListAccesoriesComponent } from './pages/list-accesories/list-accesories.component';
import { CompareAccesoriesComponent } from './pages/compare-accesories/compare-accesories.component';
import { CreateOwnAccesoriesComponent } from './pages/create-own-accesories/create-own-accesories.component';
import { ViewOwnAccesoriesComponent } from './pages/view-own-accesories/view-own-accesories.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutAccesoriesComponent,
    children:[
      { path:'list',component:ListAccesoriesComponent },
      { path:'accesoriesComparator', component:CompareAccesoriesComponent},
      { path:'createOwnAccesories',component:CreateOwnAccesoriesComponent},
      { path:'viewOwnAccesories',component:ViewOwnAccesoriesComponent},
      { path:'**', redirectTo:'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoriesRoutingModule { }
