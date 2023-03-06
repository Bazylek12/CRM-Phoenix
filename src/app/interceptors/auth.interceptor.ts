import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _storage: Storage) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this._storage.getItem('accessToken')
        const blackList = ['auth/login'];
        if (blackList.find((blackUrl) => request.url.includes(blackUrl))) {
            return next.handle(request);
        } else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            })
            return next.handle(request);
        }
    }
}