import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
                     ,canActivate:[AuthGuardService]
  } ,
  {
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
                 ,canActivate:[AuthGuardService]
  },
  {
    path: 'admin/providers', loadChildren: () => import('./pages/providers/providers.module').then(m => m.ProvidersModule)
                           ,canActivate:[AuthGuardService]
  },
  {
    path: 'providers', loadChildren: () => import('./pages/providers/providers.module').then(m => m.ProvidersModule)
                    ,canActivate:[AuthGuardService]
  },
  
  {
    path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/signin'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
