import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  Url = environment.BaseURL;
  token: any;
  userLang: any;
  httpOptions: any;
  option: IndividualConfig;

  constructor(private httpClient: HttpClient,
    private toastr: ToastrService,
    public translate: TranslateService,
    ) {
    }

  getTokenAndHeaders() {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`
      })
    };
  }

  // GET USER PERSONAL INFORMATION
  getUserData(): Observable<any> {
    const Token = localStorage.getItem('token');
    // console.log('TOKEN', Token);
    const HttpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${Token}`
      })
    };
    return this.httpClient.get(`${this.Url}User/GetLoggedInUser`, HttpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  // EDIT USER PERSONAL INFORMATION
  editUser(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/EditUser`, user, this.httpOptions).pipe(
      tap((res: any) => {
        // console.log('In EditUser service:', res);
      })
    );
  }


  editUserPhoneNumber(editedMobileNo: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}User/EditUserPhoneNumber`, editedMobileNo, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  confirmNewPhoneNumber(OTPAndMobileNo: any) {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/ConfirmNewPhoneNumber`, OTPAndMobileNo, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  resendOtpForPhoneNumber(resendOTPDetails: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}User/ResendOtpForPhoneNumber`, resendOTPDetails, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  confirmEmail(userId, code): Observable<any> {
    return this.httpClient.patch(`${this.Url}Account/ConfirmEmail?userId=${userId}&code=${code}`, null).pipe(
      tap((res: any) => {
      })
    );
  }
  ConfirmNewEmail(email, userId, code): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}User/ConfirmNewEmail?email=${email}&userId=${userId}&code=${code}`,
    null, this.httpOptions)
    .pipe(
      tap((res: any) => {
      })
    );
  }

  // DELETE User
  deleteUser(id: any): Observable<any> {
    this.getTokenAndHeaders();
    console.log('authorization', this.httpOptions);
    return this.httpClient.delete(`${this.Url}User/DeleteUser?id=${id}`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  // Deactivate User
  deActivateUser(id: any): Observable<any> {
    this.getTokenAndHeaders();

    return this.httpClient.patch(`${this.Url}User/DeactivateUser?id=${id}`, null, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  // GET USER Address INFORMATION
  getUserAddress(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}UserAddresses/GetLoggedInUserAddress`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  // Add USER Address INFORMATION
  addUserAddress(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}UserAddresses/AddUserAddress`, user, this.httpOptions).pipe(
      tap((res: any) => {
        // console.log('In AddUserAddress service:', res);
      })
    );
  }

  // EDIT USER Address INFORMATION
  editUserAddress(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}UserAddresses/EditUserAddress`, user, this.httpOptions).pipe(
      tap((res: any) => {
        // console.log('In EditUserAddress service:', res);
      })
    );
  }

  // GET USER BANK  INFORMATION
  getUserBankInfo(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}UserBanks/GetLoggedInUserBank`, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  // Add USER BANK INFORMATION
  addUserBankInfo(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}UserBanks/AddUserBank`, user, this.httpOptions).pipe(
      tap((res: any) => {
        // console.log('In AddUserBank service:', res);
      })
    );
  }

  // EDIT USER BANK INFORMATION
  editUserBankInfo(user: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}UserBanks/EditUserBank`, user, this.httpOptions).pipe(
      tap((res: any) => {
        // console.log('In EditUserBank service:', res);
      })
    );
  }
  uploadAccountStatement(formData: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}UserBanks/UploadAccountStatement`, formData, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }
  uploadSalaryStatement(formData: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}UserBanks/UploadSalaryStatement`, formData, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  contactUs(body: any) {
    return this.httpClient.post(`${this.Url}ContactUs/AddMessage`, body, this.httpOptions).pipe(
      tap((res: any) => {
      })
    );
  }

  showSuccessToastr(result: any) {
    this.userLang = this.translate.currentLang;
    if (this.userLang == 'english') {
      this.showEnglishToast('OK!!', result.message, 'success');
    }
    if (this.userLang == 'arabic') {
      this.showArabicToast('حسنا!', result.arabicMessage, 'success');
    }
  }
  showErrorToastr(message: any) {
    this.userLang = this.translate.currentLang;
    console.log(this.userLang);
    var errorMessage = message.split('|');
    console.log(errorMessage);
    // var indexToSplit = message.indexOf('|');
    // var eng = message.slice(0, indexToSplit);
    // var arb = message.slice(indexToSplit + 1);
    if (this.userLang == 'english') {
      this.showEnglishToast('OK!!', errorMessage[0], 'error');
    }
    if (this.userLang == 'arabic') {
      this.showArabicToast('خطأ!', errorMessage[1], 'error');
    } else {
      this.showEnglishToast('OK!!', errorMessage[0], 'error');
    }
  }
  showEnglishToast(title, message, type) {
    this.toastr.show(message, title, this.option, 'toast-' + type);
  }
  showArabicToast(title, message, type) {
    this.toastr.show(message, title, this.option, 'toast-' + type);
  }

}
