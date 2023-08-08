import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardAdminFn, authGuardFn } from './shared/guards/auth-fn.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'sets',
    canActivate: [authGuardFn],
    loadChildren: () => import('./sets/sets.module').then(m => m.SetsModule)
  },
  {
    path:'accesories',
    canActivate: [authGuardFn],
    loadChildren: () => import('./accesories/accesories.module').then(m => m.AccesoriesModule)
  },
  {
    path:'ninjas',
    canActivate: [authGuardFn],
    loadChildren: () => import('./ninjas/ninja.module').then(m => m.NinjaModule)
  },
  {
    path:'formations',
    canActivate: [authGuardFn],
    loadChildren: () => import('./formations/formations.module').then(m => m.FormationsModule)
  },
  {
    path:'admin',
    canActivate: [authGuardAdminFn],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
