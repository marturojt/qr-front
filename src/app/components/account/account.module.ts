import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountLayoutComponent,
    LoginComponent,
    ForgotPwdComponent,
    ResetPwdComponent,
    VerifyAccountComponent
  ]
})
export class AccountModule { }
