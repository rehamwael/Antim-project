import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  Url = environment.baseAPIURL;


  constructor(private httpClient: HttpClient) { }

  editUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
          authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.patch(`${this.Url}User/EditUser`, user, httpOptions).pipe(
      tap((res: any ) => {
        console.log('In EditUser service:', res);
        })
    );
  }
}
