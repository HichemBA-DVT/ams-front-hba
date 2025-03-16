// src/app/services/provider.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Provider {
  id: number;
  name: string;
  address: string;
  phone_number : string;
  email: string;
  logo:   string;
}

@Injectable({
  providedIn: 'root'  // This makes the service available throughout the app
})
export class ProviderService {
  //private apiUrl = 'http://127.0.0.1:8080/providers/'; // Remplacez par l'URL réelle de votre API
  private apiProviders = environment.apiUrl+ 'providers/';

  constructor(private http: HttpClient) {}

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiProviders);
  }
 
  deleteProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProviders}${id}`);
  }

  
  /*addProvider(provider: any): Observable<Provider> {
    return this.http.post<Provider>(this.apiProviders, provider);
  }*/

    addProvider(providerForm: any) {
      const headers = new HttpHeaders();
      //headers.append('Content-Type', 'multipart/form-data');
          return this.http.post<Provider>(this.apiProviders, providerForm);

      //return this.http.post(this.apiProviders, provider, { headers });
  
    }

  updateProvider(provider: any): Observable<Provider> {
    return this.http.put<Provider>(this.apiProviders, provider);
  }

  getProviderById(id: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.apiProviders}${id}`);
}
}
