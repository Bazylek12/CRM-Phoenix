import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {AutoLoginGuard} from "./gaurds/auto-login/auto-login.guard";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponentModule} from "./components/login/login.component-module";
import {RegisterComponentModule} from "./components/register/register.component-module";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AutoLoginGuard],
        data: {
          leadsUrl: '/leads'
        }
        },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AutoLoginGuard],
        data: {
          leadsUrl: '/leads'
        }
      },
    ]),
    LoginComponentModule, RegisterComponentModule
  ]
})

export class AuthRoutesModule {}
