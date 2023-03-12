import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {LeadsComponent} from './components/leads/leads.component';
import {RegisterComponent} from './components/register/register.component';
import {VerifyComponent} from './components/verify/verify.component';
import {BioComponent} from './components/bio/bio.component';
import {LoginComponentModule} from './components/login/login.component-module';
import {AuthServiceModule} from './services/auth.service-module';
import {LeadsComponentModule} from './components/leads/leads.component-module';
import {RegisterComponentModule} from './components/register/register.component-module';
import {VerifyComponentModule} from './components/verify/verify.component-module';
import {BioComponentModule} from './components/bio/bio.component-module';
import {IsVerifiedGuard} from "./gaurds/is-verified/is-verified.guard";
import {IsProfileCompletedGuard} from "./gaurds/is-profile-completed/is-profile-completed.guard";
import {IsLoggedInGuard} from "./gaurds/is-logged-in/is-logged-in.guard";
import {LogoutComponent} from "./components/logout/logout.component";
import {LogoutComponentModule} from "./components/logout/logout.component-module";
import {AutoLoginGuard} from "./gaurds/auto-login/auto-login.guard";
import {CreateLeadComponent} from "./components/create-lead/create-lead.component";
import {CreateLeadComponentModule} from "./components/create-lead/create-lead.component-module";
import {IsAdminGuard} from "./gaurds/is-admin/is-admin.guard";
import {AuthRoutesModule} from "./auth.routes";

@NgModule({
    imports: [RouterModule.forRoot([
      { path: '',   redirectTo: '/leads', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => AuthRoutesModule
      },
      {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [IsLoggedInGuard, IsVerifiedGuard, IsProfileCompletedGuard],
        data: {
            verifyUrl: '/verify',
            addBioUrl: '/complete-profile',
            loginUrl: '/auth/login'
        }
    },
        {
            path: 'verify',
            component: VerifyComponent,
            canActivate: [IsLoggedInGuard],
            data: {
                loginUrl: '/auth/login'
            }

        }, {
            path: 'complete-profile',
            component: BioComponent,
            canActivate: [IsLoggedInGuard],
            data: {
                loginUrl: '/auth/login'
            }
        },  {
            path: 'logged-out',
            component: LogoutComponent
        }, {
            path: 'create-lead',
            component: CreateLeadComponent,
            canActivate: [IsAdminGuard],
            data: {
              role: 'admin',
              leadsUrl: '/leads'
            }
      }]), AuthServiceModule, LogoutComponentModule, CreateLeadComponentModule, LeadsComponentModule, VerifyComponentModule, BioComponentModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
