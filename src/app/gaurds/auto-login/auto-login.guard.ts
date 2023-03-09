import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {map, take} from "rxjs/operators";
import {UsersService} from "../../services/users.service";

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private _usersService: UsersService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.accessToken$.pipe(
        take(1),
        map(isLoggedIn => {
          return !isLoggedIn ? true : this._router.parseUrl(route.data['leadsUrl'])
        })
    )
  }
}
