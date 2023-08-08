import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminAccesoriesComponent } from './layout-admin-accesories/layout-admin-accesories.component';
import { NewAccesorieSetComponent } from 'src/app/accesories/pages/admin/new-accesorie-set/new-accesorie-set.component';
import { UpdateAccesorieSetComponent } from 'src/app/accesories/pages/admin/update-accesorie-set/update-accesorie-set.component';

const routes: Routes = [
  {
  path:'',
  component: LayoutAdminAccesoriesComponent,
  children:[
    { path: 'newAccesorieSet', component: NewAccesorieSetComponent },
    { path: 'updateAccesorieSet', component: UpdateAccesorieSetComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAccesoriesRoutingModule { }
