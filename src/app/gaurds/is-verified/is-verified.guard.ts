import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {map, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class IsVerifiedGuard implements CanActivate {
    constructor(private _usersService: UsersService, private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._usersService.getUserData().pipe(
            take(1),
            map(response => {
                    return response.user.context.email_verified ? true : this._router.parseUrl(route.data['verifyUrl'])
                }
            )
        )
    }
}
