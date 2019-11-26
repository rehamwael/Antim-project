import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  Url = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) { }

  resetPassword(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}Account/ResetPassword`, user).pipe(
      tap((res: any ) => {
        console.log('In ResetPassword api:', res);
        })
    );
  }
}
