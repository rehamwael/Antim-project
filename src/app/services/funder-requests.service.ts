import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunderRequestService {
  Url = environment.baseAPIURL;
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
  // FunderAllRequests(): Observable<any> {
  //   this.getTokenAndHeaders();
  //   return this.httpClient.get(`${this.Url}CustomerRequest/GetCustomerRequests`, this.httpOptions).pipe(
  //     tap((res: any) => {
  //     })
  //   );
  // }
  // getRequestDataById(id: any): Observable<any> {
  //   this.getTokenAndHeaders();
  //   return this.httpClient.get(`${this.Url}CustomerRequest/GetCustomerRequestById?id=${id}`, this.httpOptions).pipe(
  //     tap((res: any) => {
  //     })
  //   );
  // }
}
