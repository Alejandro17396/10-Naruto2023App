import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEquipmentComponent } from 'src/app/sets/pages/admin/new-equipment/new-equipment.component';
import { LayoutAdminSetsComponent } from './layout-admin-sets/layout-admin-sets.component';
import { DeleteEquipmentComponent } from 'src/app/sets/pages/admin/delete-equipment/delete-equipment.component';
import { UpdateEquipmentComponent } from 'src/app/sets/pages/admin/update-equipment/update-equipment.component';
import { ViewEquipmentsComponent } from 'src/app/sets/pages/admin/view-equipments/view-equipments.component';

const routes: Routes = [
  {
  path:'',
  component: LayoutAdminSetsComponent,
  children:[
    { path: 'newEquipment', component: NewEquipmentComponent },
    { path: 'updateEquipment', component: UpdateEquipmentComponent },
    //loadChildren: () => import('../sets/sets.module').then(m => m.SetsModule) },
    //{ path:'newEquipment',component:NewEquipmentComponent },
  ]

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSetsRoutingModule { }
