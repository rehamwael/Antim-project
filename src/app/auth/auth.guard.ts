import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProfileService } from '../services/userProfile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const url: string = state.url;
    const roles = route.data;
    const expectedRole = roles.userRole[0];
    const role = localStorage.getItem('role');

    return this.authService.User.pipe(
      take(1),
      map(token => {
        if (token) {
          if (role === expectedRole) {
            return true;
          } else {
            this.router.navigate(['/dashbored-' + role]);
            this.profileService.showErrorToastr('You have not permission to access this URL. | ليس لديك إذن للوصول إلى هذا الرابط');
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          this.profileService.showErrorToastr('You are not authorized to access this URL. Please login to get access. | غير مصرح لك بالوصول إلى هذا الرابط. يرجى تسجيل الدخول للوصول إلى لوحة القيادة');
          return false;
        }
      })
    );
  }

}
