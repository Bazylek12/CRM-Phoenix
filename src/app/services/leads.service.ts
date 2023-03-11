import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {LeadModel} from "../models/lead.model";
import {map} from "rxjs/operators";
import {ApiResponse} from "../responses/api.response";
import {ActivityModel} from "../models/activity.model";

@Injectable({ providedIn: 'root' })
export class LeadsService {
  constructor(private _httpClient: HttpClient) {
  }

  getLeads(): Observable<LeadModel[]> {
    return this._httpClient.get<ApiResponse<LeadModel[]>>(`${environment.apiUrl}/leads`).pipe(
        map(response => response.data),
    );
  }

  createLead(payload: LeadModel): Observable<LeadModel> {
    return this._httpClient.post<LeadModel>(`${environment.apiUrl}/leads`, {data: payload})
  }
  getActivities(): Observable<ActivityModel[]> {
    return this._httpClient.get<ApiResponse<ActivityModel[]>>(`${environment.apiUrl}/leads/activities`).pipe(
        map(response => response.data),
    );
  }
}
