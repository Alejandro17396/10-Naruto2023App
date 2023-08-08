import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from './pages/layout-admin/layout-admin.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutAdminComponent,
    children:[
      {
        path:'user', component: UserAdminComponent
      },
      { 
        path: 'sets', 
        loadChildren: () => import('./admin-sets/admin-sets.module').then(m => m.AdminSetsModule) 
      },
      { 
        path: 'accesories', 
        loadChildren: () => import('./admin-accesories/admin-accesories.module').then(m => m.AdminAccesoriesModule) 
      },
      { 
        path: 'ninjas', 
        loadChildren: () => import('./admin-ninjas/admin-ninjas.module').then(m => m.AdminNinjasModule) 
      },
      {
        path:'**',
        redirectTo:'user'
      }
      //loadChildren: () => import('../sets/sets.module').then(m => m.SetsModule) },
      //{ path:'newEquipment',component:NewEquipmentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
