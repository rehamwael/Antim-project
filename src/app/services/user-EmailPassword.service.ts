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
  resetPassword(passwordDetails: any): Observable<any> {
    return this.httpClient.patch(`${this.Url}Account/ResetPassword`, passwordDetails).pipe(
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
  // CHANGE PASSWORD
  changePassword(passwordDetails: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Account/ChangePassword`, passwordDetails, this.httpOptions).pipe(
      tap((res: any ) => {
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
  resendRegisterEmail(email: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}Account/ResendRegisterEmail`, email, this.httpOptions).pipe(
      tap((res: any ) => {
        })
    );
  }

}
