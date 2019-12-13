import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserEmailPasswordService {
  Url = environment.BaseURL;
  token: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) { }
  getTokenAndHeaders() {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`
      })
    };
  }
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
  editUserEmail(body: any): Observable<any> {
    this.getTokenAndHeaders();

    return this.httpClient.post(`${this.Url}User/EditUserEmail`, body, this.httpOptions).pipe(
      tap((res: any ) => {
        })
    );
  }

}
