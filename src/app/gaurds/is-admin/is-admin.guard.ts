import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from "../../services/users.service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {
  constructor(private _usersService: UsersService, private _router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
    return this._usersService
      .adminRole$
      .pipe(map((isAdmin) => (isAdmin?.includes(route.data['role']) ? true : this._router.parseUrl(route.data['leadsUrl']))
      )
      );
  }
  }

