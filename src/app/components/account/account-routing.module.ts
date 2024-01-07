import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';

const routes: Routes = [
    {
        path: '', component: AccountLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterUserComponent },
            { path: 'verify-email', component: VerifyAccountComponent },
            { path: 'forgot-password', component: ForgotPwdComponent },
            { path: 'reset-password', component: ResetPwdComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
