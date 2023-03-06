import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LeadsComponent } from './components/leads/leads.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { LoginComponentModule } from './components/login/login.component-module';
import { AuthServiceModule } from './services/auth.service-module';
import { LeadsComponentModule } from './components/leads/leads.component-module';
import { RegisterComponentModule } from './components/register/register.component-module';
import { VerifyComponentModule } from './components/verify/verify.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'auth/login', component: LoginComponent }, { path: 'leads', component: LeadsComponent }, { path: 'auth/register', component: RegisterComponent }, { path: 'verify', component: VerifyComponent }]), LoginComponentModule, AuthServiceModule, LeadsComponentModule, RegisterComponentModule, VerifyComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
