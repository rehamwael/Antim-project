import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      tap(val => this.isLoggedIn = true)
    );

  }
  logout(): Observable<boolean> {
    return of(false).pipe(
      tap(val => this.isLoggedIn = false)
    );

  }
  // logout(): void {
  //   this.isLoggedIn = false;
  // }
}
