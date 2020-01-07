import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
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

  getUserNotifications(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetLoggedInUserNotifications`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  readNotification(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}Notification/ReadNotificationById?id=${id}`, null, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  filterByDateNotifications(fromDate, toDate): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetFilteredNotifications?dateFrom=${fromDate}&dateTo=${toDate}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  getNotificationsCount(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}Notification/GetUnreadUserNotificationsCount`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

}
