import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  Url = environment.baseAPIURL;

  constructor(private httpClient: HttpClient) { }

  getUserData(): Observable<any> {
  const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
          authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${this.Url}User/GetLoggedInUser`, httpOptions).pipe(
      tap((res: any ) => {
        // console.log('In GetLoggedInUser api:', res);
        })
    );
  }
}
