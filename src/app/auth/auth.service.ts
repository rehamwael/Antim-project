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
  // redirectUrl: string;

  constructor(private httpClient: HttpClient) {
   this.loadUser();
   this.User = this.authState.asObservable();
  }

  loadUser() {
    // const User = localStorage.getItem('User');
    const token = localStorage.getItem('access_token');
    // console.log('Loaded USER: ', localStorage.getItem('User'));
    console.log('token: ', localStorage.getItem('access_token'));
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
      localStorage.setItem('access_token', res.token);
      // localStorage.setItem('User', res.data);
        this.authState.next(user);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}/users/signup`, user).pipe(
      tap((res: any ) => {
        localStorage.setItem('access_token', res.token);
        this.authState.next(user);
        })
    );
  }

  logout(): Observable<boolean> {
    this.authState.next(null);
     localStorage.removeItem('access_token');
     this.loadUser();
    return of(false).pipe(
      tap(val => this.isLoggedIn = false)
    );
  }

}
