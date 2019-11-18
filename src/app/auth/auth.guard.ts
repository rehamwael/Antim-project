import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  options: IndividualConfig;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const url: string = state.url;

   // return this.checkLogin(url);
   return this.authService.User.pipe(
    take(1),
    map(User => {
      // console.log('login:', User);
      if (User) {
        return true;
      } else {
    this.router.navigate(['/login']);
    this.showToast('Error!!', 'You are not Logged In. Please login to get access.', 'error');
    return false;
        }
      })
    );
  }
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
  showToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
}
}
