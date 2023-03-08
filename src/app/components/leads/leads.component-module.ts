import { NgModule } from '@angular/core';
import { LeadsComponent } from './leads.component';
import {IconsModule} from "../../icons/icons.module";
import {AsyncPipe, NgIf} from "@angular/common";

@NgModule({
  imports: [IconsModule, NgIf, AsyncPipe],
  declarations: [LeadsComponent],
  providers: [],
  exports: [LeadsComponent]
})
export class LeadsComponentModule {
}
