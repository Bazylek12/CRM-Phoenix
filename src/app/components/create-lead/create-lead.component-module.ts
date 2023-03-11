import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateLeadComponent } from './create-lead.component';
import {AsyncPipe, CommonModule, NgClass, NgIf} from "@angular/common";
import {FeatherModule} from "angular-feather";

@NgModule({
  imports: [ReactiveFormsModule, NgClass, AsyncPipe, NgIf, FeatherModule, CommonModule],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent]
})
export class CreateLeadComponentModule {
}
