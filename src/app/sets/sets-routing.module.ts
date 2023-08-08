import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSetsComponent } from './pages/search-sets/search-sets.component';
import { LayoutSetsComponent } from './pages/layout-sets/layout-sets.component';
import { CompareSetsComponent } from './pages/compare-sets/compare-sets.component';
import { ViewOwnSetsComponent } from './pages/view-own-sets/view-own-sets.component';
import { CreateOwnSetsComponent } from './pages/create-own-sets/create-own-sets.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutSetsComponent,
    children:[
      { path:'search',component:SearchSetsComponent },
      { path:'setsComparator', component:CompareSetsComponent},
      { path:'createOwnSets',component:CreateOwnSetsComponent},
      { path:'viewOwnSets',component:ViewOwnSetsComponent},
      { path:'**', redirectTo:'search'}
    ]
  }/*,
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule { }
