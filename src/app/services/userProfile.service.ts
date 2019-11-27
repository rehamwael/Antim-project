import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.get(`${this.Url}User/GetLoggedInUser`, httpOptions).pipe(
        tap((res: any ) => {
          })
      );
    }
    addUserAddress(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.post(`${this.Url}UserAddresses/AddUserAddress`, user, httpOptions).pipe(
        tap((res: any ) => {
          console.log('In AddUserAddress service:', res);
          })
      );
    }
    editUserAddress(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.patch(`${this.Url}UserAddresses/EditUserAddress`, user, httpOptions).pipe(
        tap((res: any ) => {
          console.log('In EditUserAddress service:', res);
          })
      );
    }
}
