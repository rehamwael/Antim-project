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
    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerAllRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  customerOngoingRequests(): Observable<any> {

    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerOngoingRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  customerAwaitingRequests(): Observable<any> {

    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerAwaitingRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  customerRejectedRequests(): Observable<any> {
    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerRejectedRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  customerClosedRequests(): Observable<any> {
    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerClosedRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  customerDraftedRequests(): Observable<any> {
    return this.httpClient.get(`${this.Url}CustomerRequest/CustomerDraftedRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }


  AddCustomerRequest(customer: any): Observable<any> {

    return this.httpClient.post(`${this.Url}CustomerRequest/AddRequest`, customer, this.httpOptions).pipe(
      tap((res: any) => {
        console.log('In AddRequest service:', res);
      })
    );
  }

  EditCustomerRequest(customer: any): Observable<any> {

    return this.httpClient.patch(`${this.Url}CustomerRequest/EditRequest`, customer, this.httpOptions).pipe(
      tap((res: any) => {
        console.log('In EditRequest service:', res);
      })
    );
  }
}

  // CustomerRequest/ChangeCustomerRequestType
  // CustomerRequest/DeleteRequest

