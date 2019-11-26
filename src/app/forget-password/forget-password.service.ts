import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  Url = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) { }
  sendEmailToUser(email: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ForgotPassword`, email).pipe(
      tap((res: any ) => {
        console.log('In ForgotPassword api:', res);
        })
    );
  }
}
