import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'sets',
    loadChildren: () => import('./sets/sets.module').then(m => m.SetsModule)
  },
  {
    path:'accesories',
    loadChildren: () => import('./accesories/accesories.module').then(m => m.AccesoriesModule)
  },
  {
    path:'ninjas',
    loadChildren: () => import('./ninjas/ninja.module').then(m => m.NinjaModule)
  },
  {
    path:'formations',
    loadChildren: () => import('./formations/formations.module').then(m => m.FormationsModule)
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
