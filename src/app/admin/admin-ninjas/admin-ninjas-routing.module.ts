import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminNinjasComponent } from './layout-admin-ninjas/layout-admin-ninjas.component';
import { NewNinjaComponent } from 'src/app/ninjas/pages/admin/new-ninja/new-ninja.component';
import { UpdateNinjaComponent } from 'src/app/ninjas/pages/admin/update-ninja/update-ninja.component';

const routes: Routes = [
  {
  path:'',
  component: LayoutAdminNinjasComponent,
  children:[
    { path: 'newNinja', component: NewNinjaComponent },
    { path: 'updateNinja', component: UpdateNinjaComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNinjasRoutingModule { }
