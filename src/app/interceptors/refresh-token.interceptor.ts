import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const refreshToken = localStorage.getItem('refreshToken');
    const blackList = ['/auth/login', '/auth/register']
    if (blackList.find((url) => request.url.endsWith(url)) !== undefined) {
      return next.handle(request)
    } else {
      return next.handle(request).pipe(
        catchError((e: HttpErrorResponse) => {
          if (e.status === 403 && e.error.message === 'Token is invalid') {
            return this._authService.refreshToken(refreshToken!).pipe(
              switchMap((newTok) => {
                const transformedReq = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    `bearer ${newTok.accessToken}`
                  ),
                });
                return next.handle(transformedReq)
              })
            )
          }
          return throwError(() => e);
        })
      )
    }

  }
}
