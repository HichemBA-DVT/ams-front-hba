import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
//import { ProvidersModule } from './pages/providers/providers.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCountriesDropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,        // <------------------- to use ngForm in html !!!! &&     FormsModule -->  to be added also  provider component
    //,ProvidersModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService, // Remplacez par votre interceptor personnalisé
    multi: true
  },
  provideHttpClient(withInterceptorsFromDi())
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
