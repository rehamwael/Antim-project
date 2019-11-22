import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  Url = environment.baseAPIURL;
  authState  =  new BehaviorSubject(null);
  User: Observable<any>;
  redirectUrl: string;

  constructor(private httpClient: HttpClient) {
   this.loadUser();
   this.User = this.authState.asObservable();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log('token: ', token);
    console.log('role: ', role);
     if (token) {
      this.authState.next(token);
    } else {
      this.authState.next(null);
    }
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}/users/login`, user).pipe(
      tap((res: any ) => {
        this.isLoggedIn = true;
      localStorage.setItem('token', res.token);
        this.authState.next(res.token);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}/users/signup`, user).pipe(
      tap((res: any ) => {
        localStorage.setItem('token', res.token);
        this.authState.next(res.token);
        })
    );
  }

  // logout(): Observable<boolean> {
  //   this.authState.next(null);
  //    localStorage.removeItem('token');
  //    localStorage.removeItem('role');
  //    this.loadUser();
  //   return of(false).pipe(
  //     tap(val => this.isLoggedIn = false)
  //   );
  // }

}
