import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CredentialModel} from '../models/credential.model';
import {LoginResponse} from '../responses/login.response';
import {ApiResponse} from '../responses/api.response';
import {environment} from '../../environments/environment';
import {RegisterResponse} from "../responses/register.response";

@Injectable()
export class AuthService {
  private _accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._storage.getItem('accessToken')!);
  public accessToken$: Observable<string> = this._accessTokenSubject.asObservable();
  private _refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this._storage.getItem('refreshToken')!);
  public refreshToken$: Observable<string> = this._refreshTokenSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: Storage) {
  }

  login(credentials: CredentialModel): Observable<LoginResponse> {
    return this._httpClient.post<ApiResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, {
        data: credentials
      }
    ).pipe(
      map(response => response.data),
      tap(response => {
        this._storage.setItem('accessToken', response.accessToken)
        this._accessTokenSubject.next(response.accessToken)
        this._storage.setItem('refreshToken', response.refreshToken)
        this._refreshTokenSubject.next(response.refreshToken)
      })
    );
  }

  register(credentials: CredentialModel): Observable<RegisterResponse> {
    return this._httpClient.post<ApiResponse<RegisterResponse>>(`${environment.apiUrl}/auth/register2`, {
      data: credentials
    }).pipe(
      map(response => response.data),
      tap(response => {
        console.log(response)
      })
    )
  }
}
