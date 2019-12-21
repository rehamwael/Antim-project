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
  Url = environment.BaseURL;
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
     if (token) {
      this.authState.next(token);
    } else {
      this.authState.next(null);
    }
  }

  login(user: any): Observable<any> {
    const data = 'username=' + user.username + '&password=' + user.password + '&grant_type=password';
    return this.httpClient.post(`${this.Url}login`, data).pipe(
      tap((res: any ) => {
        localStorage.setItem('token', res.access_token);
        this.authState.next(res.access_token);
      }));
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/Register`, user).pipe(
      tap((res: any ) => {
        // console.log('In register auth service:', res);
        })
    );
  }
  registerWithOTP(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/RegisterWithOTP`, user).pipe(
      tap((res: any ) => {
        console.log('In RegisterWithOTP auth service:', res);
        })
    );
  }
  ResendOtp(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ResendOtp`, user).pipe(
      tap((res: any ) => {
        // console.log('In ResendOtp auth service: ', res);
        })
    );
  }

}
