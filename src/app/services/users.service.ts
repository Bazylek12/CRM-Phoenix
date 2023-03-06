import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private _httpClient: HttpClient) {
  }

  getUserData(): Observable<void> {
    return this._httpClient.get<void>(`${environment.apiUrl}/auth/me`);
  }
}
