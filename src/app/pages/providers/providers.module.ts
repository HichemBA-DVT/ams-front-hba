import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProviderListComponent,
    AddProviderComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    FormsModule
  ]
})
export class ProvidersModule { }
