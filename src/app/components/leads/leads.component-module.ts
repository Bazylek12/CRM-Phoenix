import { NgModule } from '@angular/core';
import { LeadsComponent } from './leads.component';
import {IconsModule} from "../../icons/icons.module";
import {AsyncPipe, JsonPipe, NgFor, NgIf} from "@angular/common";
import { CommonModule } from '@angular/common';
import {RouterLinkWithHref} from "@angular/router";

@NgModule({
    imports: [IconsModule, NgIf, AsyncPipe, JsonPipe, NgFor, CommonModule, RouterLinkWithHref],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent]
})
export class LeadsComponentModule {
}
