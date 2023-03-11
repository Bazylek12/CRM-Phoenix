import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {BehaviorSubject, Observable, of, shareReplay} from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivityModel } from '../../models/activity.model';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { LeadsService } from '../../services/leads.service';
import { UserResponse } from '../../responses/user.response';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLeadComponent {
  constructor(private _usersService: UsersService,
              private _authService: AuthService,
              private _router: Router,
              private _leadsService: LeadsService) {
  }

  readonly activitiesList$: Observable<ActivityModel[]> = this._leadsService.getActivities().pipe(
    shareReplay(1),
    tap(data => this.addActivitiesControls(data))
  );

  readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();
  readonly statusList$: Observable<string[]> = of(['Preliminaries', 'Investigation', 'Demonstrating Capabilities', 'Obtaining Commitment'])
  private _userMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userMenu$: Observable<boolean> = this._userMenuSubject.asObservable();
  readonly leadInfoForm: FormGroup = new FormGroup({
    companyName: new FormControl(),
    websiteLink: new FormControl(),
    linkedinLink: new FormControl(),
    location: new FormControl(),
    industry: new FormControl(),
    annualRevenue: new FormControl()
  });
  readonly activitiesForm: FormGroup = new FormGroup({});
  readonly sizeForm: FormGroup = new FormGroup({
    total: new FormControl(),
    dev: new FormControl(),
    fe: new FormControl()
  });
  readonly hiringForm: FormGroup = new FormGroup({
    active: new FormControl(false),
    junior: new FormControl(false),
    talentProgram: new FormControl(false)
  });
  readonly createLeadForm: FormGroup = new FormGroup({
    leadInfo: this.leadInfoForm,
    activities: this.activitiesForm,
    companySize: this.sizeForm,
    hiring: this.hiringForm,
    status: new FormControl(),
    notes: new FormControl(),
  });

  public toggleUserMenu(): void {
    this.userMenu$.pipe(
      take(1),
      tap(status => {
        this._userMenuSubject.next(!status)
      })
    ).subscribe()
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out'])
  }

  addActivitiesControls(activityList: ActivityModel[]): void {
    activityList.forEach((activity) => this.activitiesForm.addControl(activity.id, new FormControl(false)));
  }

  onCreateLeadFormSubmitted(createLeadForm: FormGroup): void {
    if (!this.createLeadForm.valid) return;
      this._leadsService
        .createLead({
          name: this.leadInfoForm.value.companyName,
          websiteLink: this.leadInfoForm.value.websiteLink,
          linkedinLink: this.leadInfoForm.value.linkedinLink,
          location: this.leadInfoForm.value.location,
          industry: this.leadInfoForm.value.industry,
          annualRevenue: +this.leadInfoForm.value.annualRevenue,
          activityIds: Object.keys(this.activitiesForm.value).reduce((a: string[], c: string) => {
            if (this.activitiesForm.value[c]) {
              return [...a, c];
            } else {
              return a;
            }
          }, []),
          companySize: {
            total: this.sizeForm.value.total,
            dev: this.sizeForm.value.dev,
            fe: this.sizeForm.value.fe,
          },
          hiring: {
            active: this.hiringForm.value.active,
            junior: this.hiringForm.value.junior,
            talentProgram: this.hiringForm.value.talentProgram
          }
        }).subscribe()
    }
  }

