import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserResponse} from '../responses/user.response';
import {ApiResponse} from '../responses/api.response';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(private _httpClient: HttpClient) {
    }

    getUserData(): Observable<UserResponse> {
        return this.userDetails$
    }

    private userDetails$: Observable<UserResponse> = this._httpClient.get<ApiResponse<UserResponse>>(`${environment.apiUrl}/auth/me`).pipe(
        map(response => response.data),
        shareReplay(1)
    );

    addBio(content: string): Observable<void> {
        return this._httpClient.post<void>(`${environment.apiUrl}/auth/add-bio`, {
            data: {
                content: content
            }
        });
    }

     getBio(): Observable<void> {
        return this.getUserBio$
    }

    private getUserBio$: Observable<void> = this._httpClient.get<void>(`${environment.apiUrl}/auth/my-bio`).pipe(shareReplay(1));
}
