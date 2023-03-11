import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateLeadComponent {
  readonly leadInfoForm: FormGroup = new FormGroup({
    companyName: new FormControl(),
    websiteLink: new FormControl(),
    linkedinLink: new FormControl(),
    location: new FormControl(),
    industrial: new FormControl(),
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
    notes: new FormControl() });
}
