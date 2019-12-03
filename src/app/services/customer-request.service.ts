import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequestService {
  Url = environment.baseAPIURL;
  token: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`
      })
    };
  }
  customerAllRequests(): Observable<any> {
    return this.httpClient.get(`${this.Url}CustomerRequest/GetCustomerRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  getRequestDataById(id: any): Observable<any> {
    return this.httpClient.get(`${this.Url}CustomerRequest/GetCustomerRequestById?id=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }


  AddCustomerRequest(customerRequest: any): Observable<any> {
    return this.httpClient.post(`${this.Url}CustomerRequest/AddRequest`, customerRequest, this.httpOptions).pipe(
      tap((res: any) => {
        console.log('In AddRequest service:', res);
      })
    );
  }

  // EditCustomerRequest(customerRequest: any): Observable<any> {
  //   return this.httpClient.patch(`${this.Url}CustomerRequest/EditRequest`, customerRequest, this.httpOptions).pipe(
  //     tap((res: any) => {
  //       console.log('In EditRequest service:', res);
  //     })
  //   );
  // }

   deleteCustomerRequest(id: any): Observable<any> {
      return this.httpClient.delete(`${this.Url}CustomerRequest/DeleteRequest?id=${id}`, this.httpOptions).pipe(
        tap((res: any) => {
          console.log('In EditRequest service:', res);
        })
      );
    }

}


