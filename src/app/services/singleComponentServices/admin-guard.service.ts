import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (JSON.parse(localStorage.getItem('isAuth')).isAuth && JSON.parse(localStorage.getItem('isAdmin')).isAdmin) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
