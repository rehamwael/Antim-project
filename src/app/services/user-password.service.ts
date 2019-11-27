import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPasswordService {
  Url = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) { }

  // RESET PASSWORD
  resetPassword(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ResetPassword`, user).pipe(
      tap((res: any ) => {
        })
    );
  }
   // FORGET PASSWORD
  sendEmailToUser(email: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ForgotPassword`, email).pipe(
      tap((res: any ) => {
        // console.log('In ForgotPassword api:', res);
        })
    );
  }
}
