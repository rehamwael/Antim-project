import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // console.log('token: ', token);
    // console.log('role: ', role);
     if (token) {
      this.authState.next(token);
    } else {
      this.authState.next(null);
    }
  }

  login(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    console.log('user', user);
    return this.httpClient.post(`${this.Url}login`, user, httpOptions).pipe(
    // return this.httpClient.post(`${this.Url}login`, user).pipe(
      tap((res: any ) => {
        console.log('In login auth service', res);
        // this.authState.next(res.access_token);
      }));
  }

  register(user: any): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.Url}Account/Register`, user).pipe(
      tap((res: any ) => {
        console.log('In register auth service', res);
        // localStorage.setItem('token', res.token);
        // this.authState.next(res.token);
        })
    );
  }
  registerWithOTP(user: any): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.Url}Account/RegisterWithOTP`, user).pipe(
      tap((res: any ) => {
        console.log('In RegisterWithOTP auth service', res);
        // localStorage.setItem('token', res.token);
        // this.authState.next(res.token);
        })
    );
  }

  // login(user: any): Observable<any> {
  //   return this.httpClient.post(`${this.Url}/users/login`, user).pipe(
  //     tap((res: any ) => {
  //       this.isLoggedIn = true;
  //     localStorage.setItem('token', res.token);
  //       this.authState.next(res.token);
  //     })
  //   );
  // }

  // register(user: any): Observable<any> {
  //   return this.httpClient.post(`${this.Url}/users/signup`, user).pipe(
  //     tap((res: any ) => {
  //       localStorage.setItem('token', res.token);
  //       this.authState.next(res.token);
  //       })
  //   );
  // }

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
