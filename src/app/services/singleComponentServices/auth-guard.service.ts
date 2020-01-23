import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log('Coucou' + JSON.parse(localStorage.getItem('isAuth')).isAuth);
    if (JSON.parse(localStorage.getItem('isAuth')).isAuth) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
