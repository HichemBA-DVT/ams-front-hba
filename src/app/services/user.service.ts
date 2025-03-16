import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { RegistrationRequest } from '../core/models/registration-request';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlSignup = environment.apiUrl+'api/auth/signup';

  constructor(private Http: HttpClient) { }

  /*createUser(user: any) {
    return this.Http.post(this.urlSignup, user);
  }*/

  createUser(registerRequest: RegistrationRequest): Observable<any> {
    return this.Http.post<any>(this.urlSignup, registerRequest);
  }
}