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

@NgModule({
    imports: [RouterModule.forRoot([{
        path: 'auth/login',
        component: LoginComponent
    }, {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [IsVerifiedGuard, IsProfileCompletedGuard],
        data: {
            verifyUrl: '/verify',
            addBioUrl: '/complete-profile'
        }
    }, {
        path: 'auth/register',
        component: RegisterComponent
    },
        {
            path: 'verify',
            component: VerifyComponent
        }, {
            path: 'complete-profile',
            component: BioComponent
        }]), LoginComponentModule, AuthServiceModule, LeadsComponentModule, RegisterComponentModule, VerifyComponentModule, BioComponentModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
