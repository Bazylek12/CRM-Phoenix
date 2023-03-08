import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of, throwError} from 'rxjs';
import {UsersService} from "../../services/users.service";
import {map, take} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class IsProfileCompletedGuard implements CanActivate {
  constructor(private _usersService: UsersService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._usersService.getBio().pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
            return err.status === 404 ? of('completeProfile') : throwError(() => err)
        }),
        map(response =>
            response === 'completeProfile' ? this._router.parseUrl(route.data['addBioUrl']) : true
        )
    )
  }
}
