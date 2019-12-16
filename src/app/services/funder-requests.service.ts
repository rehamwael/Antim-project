import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunderRequestService {
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
  funderAllRequests(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}FunderRequest/GetAllFunderRequests`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  fundingLimitMatchingRequests(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}FunderRequest/GetFundingLimitMatchingRequests` , this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getRequestDataById(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}FunderRequest/GetFunderRequestById?id=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  addFunderRequest(Request: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}FunderRequest/AddFunderRequest`, Request, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getFunderDashboardData(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}FunderRequest/GetFunderDashboard`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

}
