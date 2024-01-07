import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LoginComponent,
        ForgotPwdComponent,
        ResetPwdComponent,
        RegisterUserComponent,
        VerifyAccountComponent,
        AccountLayoutComponent
    ]
})
export class AccountModule { }
