import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.routeConfig.path === 'session' && !document.cookie) {
      return true;
    }

    if (route.routeConfig.path === 'session' && document.cookie) {
      this.router.navigate(['/home']);
      return false;
    }

    if (!document.cookie) {
      this.router.navigate(['/session']);
      return false;
    } else {
      return true;
    }
  }
}
