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

  // EDIT USER PERSONAL INFORMATION
  editUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
          authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.patch(`${this.Url}User/EditUser`, user, httpOptions).pipe(
      tap((res: any ) => {
        // console.log('In EditUser service:', res);
        })
    );
  }

    // GET USER PERSONAL INFORMATION
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

    // GET USER Address INFORMATION
    getUserAddress(): Observable<any> {
      const token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
              authorization: `Bearer ${token}`
          })
        };
        return this.httpClient.get(`${this.Url}UserAddresses/GetLoggedInUserAddress`, httpOptions).pipe(
          tap((res: any ) => {
            })
        );
      }

      // Add USER Address INFORMATION
    addUserAddress(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.post(`${this.Url}UserAddresses/AddUserAddress`, user, httpOptions).pipe(
        tap((res: any ) => {
          // console.log('In AddUserAddress service:', res);
          })
      );
    }

    // EDIT USER Address INFORMATION
    editUserAddress(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.patch(`${this.Url}UserAddresses/EditUserAddress`, user, httpOptions).pipe(
        tap((res: any ) => {
          // console.log('In EditUserAddress service:', res);
          })
      );
    }

    // GET USER BANK  INFORMATION
    getUserBankInfo(): Observable<any> {
      const token = localStorage.getItem('token');
        const httpOptions = {
          headers: new HttpHeaders({
              authorization: `Bearer ${token}`
          })
        };
        return this.httpClient.get(`${this.Url}UserBanks/GetLoggedInUserBank`, httpOptions).pipe(
          tap((res: any ) => {
            })
        );
      }

      // Add USER BANK INFORMATION
    addUserBankInfo(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.post(`${this.Url}UserBanks/AddUserBank`, user, httpOptions).pipe(
        tap((res: any ) => {
          // console.log('In AddUserBank service:', res);
          })
      );
    }

    // EDIT USER BANK INFORMATION
    editUserBankInfo(user: any): Observable<any> {
      const token = localStorage.getItem('token');

      const httpOptions = {
        headers: new HttpHeaders({
            authorization: `Bearer ${token}`
        })
      };
      return this.httpClient.patch(`${this.Url}UserBanks/EditUserBank`, user, httpOptions).pipe(
        tap((res: any ) => {
          // console.log('In EditUserBank service:', res);
          })
      );
    }
}
