import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) { }
 
 
  authenticate(username: any, password: any) : Observable<any>{

      return this.httpClient.post<any>(`${environment.apiUrl}api/auth/signin`, { username, password }).pipe(
        map((data: any) => {
          // Store the data in sessionStorage
          sessionStorage.setItem('jwtToken', data.accessToken);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('roles', data.roles); 


          this.isUserLoggedInSubject.next(true);

          return data;  // Return the entire response to the subscriber
        })
      );
    }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('username');
  }


  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('roles')

    this.isUserLoggedInSubject.next(false);
  }



}
