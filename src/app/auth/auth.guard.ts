import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProfileService } from '../services/userProfile.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  option: IndividualConfig;

  constructor(    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let roles = route.data;
    let expectedRole = roles.userRole[0];
    let role = localStorage.getItem('role');

    return this.authService.User.pipe(
      take(1),
      map(token => {
        if (token) {
          if (role === expectedRole) {
            return true;
          } else {
            this.router.navigate(['/dashbored-' + role]);
            // this.profileService.showErrorToastr('You have not permission to access this URL. | ليس لديك إذن للوصول إلى هذا الرابط');
            this.showErrorToastr('Error!', 'You have not permission to access this URL.', 'error');
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          // this.profileService.showErrorToastr('You are not authorized to access this URL. Please login to get access. | غير مصرح لك بالوصول إلى هذا الرابط. يرجى تسجيل الدخول للوصول إلى لوحة القيادة');
          this.showErrorToastr('Error!', 'You are not authorized to access this URL. Please login to get access.', 'error');
          return false;
        }
      })
    );
  }
  showErrorToastr(title, message, type) {
    this.toastr.show(message, title, this.option, 'toast-' + type);
  }

}
