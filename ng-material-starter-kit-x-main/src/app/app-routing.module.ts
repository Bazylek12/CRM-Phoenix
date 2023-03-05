import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LeadsComponent} from './components/leads/leads.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponentModule} from './components/login/login.component-module';
import {AuthServiceModule} from './services/auth.service-module';
import {LeadsComponentModule} from './components/leads/leads.component-module';
import {RegisterComponentModule} from './components/register/register.component-module';

@NgModule({
  imports: [RouterModule.forRoot([{path: 'auth/login', component: LoginComponent}, {
    path: 'leads',
    component: LeadsComponent
  }, {
    path: 'auth/register',
    component: RegisterComponent
  }]), LoginComponentModule, AuthServiceModule, LeadsComponentModule, RegisterComponentModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
