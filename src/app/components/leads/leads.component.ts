import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, Observable, combineLatest, shareReplay, of, startWith} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserResponse } from '../../responses/user.response';
import { LeadModel } from '../../models/lead.model';
import { ActivityModel } from '../../models/activity.model';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { LeadsService } from '../../services/leads.service';
import {FormControl, FormGroup} from "@angular/forms";
import {LeadSizeModel} from "../../models/lead-size.model";

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();
  readonly getAllLeads$: Observable<LeadModel[]> = this._leadsService.getLeads().pipe(shareReplay(1));
  readonly getAllActivities$: Observable<ActivityModel[]> = this._leadsService.getActivities().pipe(
    shareReplay(1),
    tap(data => this.activitiesControls(data))
  )
  private _filterModalSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public filterModal$: Observable<boolean> = this._filterModalSubject.asObservable();
  private _userMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userMenu$: Observable<boolean> = this._userMenuSubject.asObservable();
  public filterSize$: Observable<LeadSizeModel[]> = of([
    {id: '1', from: 0, to: 50},
    {id: '2', from: 51, to: 100},
    {id: '3', from: 101, to: 500},
    {id: '4', from: 501, to: 1000},
    {id: '5', from: 1001, to: undefined},
  ]).pipe(
    shareReplay(1),
    tap(data => this.sizeControls(data))
  )

  readonly sizeForm: FormGroup = new FormGroup({});
  readonly scopesForm: FormGroup = new FormGroup({});
  readonly filterForm: FormGroup = new FormGroup({
    size: this.sizeForm,
    scope: this.scopesForm
  });

  constructor(private _usersService: UsersService, private _authService: AuthService, private _router: Router, private _leadsService: LeadsService) {
  }


  readonly selectedSizeIds$: Observable<string[]> = this.sizeForm.valueChanges.pipe(
    startWith([])).pipe(
    map((sizeIds) =>
      Object.keys(sizeIds).reduce((a: string[], c) => {
        if (sizeIds[c]) {
          return [...a, c];
        } else {
          return a;
        }
      }, [])
    )
  );

  readonly selectedScopes$: Observable<string[]> = this.scopesForm.valueChanges.pipe(
    startWith([])).pipe(
      map((scopes) =>
        Object.keys(scopes).reduce((acc: string[], curr) => {
          if (scopes[curr]) {
            return [...acc, curr];
          } else {
            return acc;
          }
        }, [])
      )
  )
  readonly selectedSizesList$: Observable<LeadSizeModel[]> = combineLatest([
    this.selectedSizeIds$,
    this.filterSize$
  ]).pipe(map(([sizeIds, leadSizes]) => this.mapSizeIdsToList(sizeIds, leadSizes)))

  readonly filteredLeadList$: Observable<LeadModel[]> = combineLatest([
    this.selectedSizesList$,
    this.getAllLeads$,
    this.selectedScopes$
  ]).pipe(
    map(([sizeList, leadList, scopes]) =>
      leadList.filter(
        (lead) => sizeList.length === 0 ||
          sizeList.find(
            (size) => lead.companySize.total >= size?.from && (size.to ? lead.companySize.total <= size.to : true)
          )
      ).filter(lead => {
        let idSet = new Set(lead.activityIds);
        return scopes.length === 0 ||scopes.every(scope => idSet.has(scope))
      })
    )
  )
  readonly LeadsList$: Observable<LeadModel[]> = combineLatest([
    this.filteredLeadList$,
    this.getAllActivities$
  ]).pipe(
    map(([leads, activities]) => this._mapLeadQuery(leads, activities))
  )
  private _mapLeadQuery(leads: LeadModel[], activities: ActivityModel[]): LeadModel[] {
    const activitiesTagMap = activities.reduce((acc, curr) => (
      { ...acc, [curr.id]: curr.name }
    ), {} as Record<string, string>);

    return leads
      .map(lead => ({
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
    this.userMenu$.pipe(
      take(1),
      tap(status => {
        this._userMenuSubject.next(!status)
      })
    ).subscribe()
  }
  public showFilterModal(): void {
    this._filterModalSubject.next(true);
  }

  public hideFilterModal(): void {
    this._filterModalSubject.next(false);
  }

  private mapSizeIdsToList( sizeIds: string[], sizeList: LeadSizeModel[]): LeadSizeModel[] {
    const sizeMap = sizeList.reduce((a, c) => ({ ...a, [c.id]: c }), {} as Record<string, LeadSizeModel>);
    return sizeIds.map((sizeId) => sizeMap[sizeId]);
  }

  private sizeControls(sizeList: LeadSizeModel[]): void {
    sizeList.forEach((leadSize) =>
      this.sizeForm.addControl(leadSize.id, new FormControl(false))
    );
  }
  private activitiesControls(activitiesList: ActivityModel[]): void {
    activitiesList.forEach((activity) =>
      this.scopesForm.addControl(activity.id, new FormControl(false))
    );
  }
  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out'])
  }

  onFormReset(): void {
    this.filterForm.reset()
  }
}
