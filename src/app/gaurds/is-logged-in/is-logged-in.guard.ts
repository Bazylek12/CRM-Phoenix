import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable} from 'rxjs';
import {map, take} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Injectable({providedIn: 'root'})
export class IsLoggedInGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isLoggedIn$.pipe(
        take(1),
        map(isLoggedIn => {
          return isLoggedIn ? true : this._router.parseUrl(route.data['loginUrl'])
        })
    )
  }
}
