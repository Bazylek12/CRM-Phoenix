import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateLeadComponent } from './create-lead.component';
import {AsyncPipe, CommonModule, NgClass, NgIf} from "@angular/common";
import {FeatherModule} from "angular-feather";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [ReactiveFormsModule, NgClass, AsyncPipe, NgIf, FeatherModule, CommonModule, RouterLink],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent]
})
export class CreateLeadComponentModule {
}
