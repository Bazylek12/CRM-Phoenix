import { NgModule } from '@angular/core';
import { AutoLoginGuard } from './auto-login.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [AutoLoginGuard],
  exports: []
})
export class AutoLoginGuardModule {
}
