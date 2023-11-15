import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationDialogComponent } from './components/authentication-dialog/authentication-dialog.component';
import { ForgotPasswordDialogComponent } from './components/forgot-password-dialog/forgot-password-dialog.component';
import { ResetPasswordDialogComponent } from './components/reset-password-dialog/reset-password-dialog.component';
import { VerificationDialogComponent } from './components/verification-dialog/verification-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AuthenticationDialogComponent,
    VerificationDialogComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordDialogComponent,
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

    // ReCaptcha
    NgxCaptchaModule,
  ],
  exports: [
    AuthenticationDialogComponent,
    VerificationDialogComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AuthenticationModule { }
