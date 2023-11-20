import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedMaterialModule } from 'src/app/material.module';
import { AccountVerificationComponent } from './components/account-verification/account-verification.component';
import { AuthenticationDialogComponent } from './components/authentication-dialog/authentication-dialog.component';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthenticationDialogComponent,
    AccountVerificationComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,

    // ReCaptcha
    NgxCaptchaModule,
  ],
  exports: [
    AuthenticationDialogComponent,
    AccountVerificationComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
  ],
})
export class AuthenticationModule { }
