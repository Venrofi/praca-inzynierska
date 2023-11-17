import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogComponent } from './components/authentication-dialog/authentication-dialog.component';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AccountVerificationComponent } from './components/account-verification/account-verification.component';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

    // Angular Material
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,

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
