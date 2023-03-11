import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, shareReplay } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserResponse } from '../../responses/user.response';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { LeadsService } from '../../services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();
  readonly getAllLeads$: Observable<LeadModel[]> = this._leadsService.getLeads();
  readonly getAllActivities$: Observable<ActivityModel[]> = this._leadsService.getActivities()
  private _filterModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public filterModal$: Observable<boolean> = this._filterModalSubject.asObservable();
  private _userMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userMenu$: Observable<boolean> = this._userMenuSubject.asObservable();

  constructor(private _usersService: UsersService, private _authService: AuthService, private _router: Router, private _leadsService: LeadsService) {
  }

  readonly LeadsList$: Observable<LeadModel[]> = combineLatest([
    this._leadsService.getLeads().pipe(shareReplay(1)),
    this._leadsService.getActivities().pipe(shareReplay(1))
  ]).pipe(
    map(([leads, activities]) => this._mapLeadQuery(leads, activities))
  )

  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out'])
  }

  private _mapLeadQuery(leads: LeadModel[], activities: ActivityModel[]): LeadModel[] {
    const activitiesTagMap = activities.reduce((acc, curr) => (
      { ...acc, [curr.id]: curr.name }
    ), {} as Record<string, string>);

    return leads.map(lead => ({
      name: lead.name,
      annualRevenue: lead.annualRevenue,
      hiring: lead.hiring,
      companySize: lead.companySize,
      industry: lead.industry,
      linkedinLink: lead.linkedinLink,
      location: lead.location,
      websiteLink: lead.websiteLink,
      activityIds: lead.activityIds.map(id => activitiesTagMap[id])
    }))
  }

  public toggleUserMenu(): void {
    this.filterModal$.pipe(
      tap(toggle => {
        this._userMenuSubject.next(!toggle)
      })
    ).subscribe()
  }
  public showFilterModal(): void {
    this._filterModalSubject.next(true);
    console.log(this._filterModalSubject.value)
  }

  public hideFilterModal(): void {
    this._filterModalSubject.next(false);
  }
}
