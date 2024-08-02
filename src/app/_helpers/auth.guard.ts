import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Staff } from '../_model/staff';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  accountAdmin = ['admin'];
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const expectedRole = route.data['expectedRole'];
    const role = Object.values(currentUser.role);
    console.log(role, '---role');
    
    if (currentUser) {
      if (expectedRole) {
        if (!this.isAdminAccount(currentUser) && role.indexOf(expectedRole) === -1) {
          this.router.navigate(['/']);
          return false;
        }
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  isAdminAccount(currentUser: Staff) {
    return this.accountAdmin.indexOf(currentUser['user']) !== -1;
  }
}