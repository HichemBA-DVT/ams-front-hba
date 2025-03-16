import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { AddProviderComponent } from './add-provider/add-provider.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent,
    children: [
      {path: '',  redirectTo: 'all',pathMatch: 'full' },
      { path: 'all', component: ProviderListComponent },
      { path: 'add', component: AddProviderComponent }


      /*
  { path: '', redirectTo: 'signin', pathMatch: 'full' },

      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
      */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }



/*

import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', component: SidebarComponent,
    children: [
      {path: '', component: UserListComponent}
    ]
  }
];


*/