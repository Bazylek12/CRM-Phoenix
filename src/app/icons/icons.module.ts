import { NgModule } from '@angular/core';
import {FeatherModule} from "angular-feather";
import {LogOut} from "angular-feather/icons";

const icons = {
  LogOut
}

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
