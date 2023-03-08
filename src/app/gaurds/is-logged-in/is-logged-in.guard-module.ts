import { NgModule } from '@angular/core';
import { IsLoggedInGuard } from './is-logged-in.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [IsLoggedInGuard],
  exports: []
})
export class IsLoggedInGuardModule {
}
