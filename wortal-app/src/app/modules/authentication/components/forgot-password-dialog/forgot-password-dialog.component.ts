import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication.service';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
})
export class ForgotPasswordDialogComponent {

  @ViewChild('forgotPasswordForm') forgotPasswordForm!: NgForm;

  accountEmail!: string;

  isProcessing = false;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthenticationDialogComponent>,
    private snackBar: MatSnackBar,
  ) { }

  onEmailChange(): void {
    const emailControl = this.forgotPasswordForm.controls['email'];

    if (!emailControl) return;

    if (emailControl.dirty && emailControl.value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailControl.value)) {
        emailControl.setErrors({ invalidEmail: true });
      } else {
        emailControl.setErrors(null);
      }
    }
  }

  forgotPassword(): void {
    if (this.isProcessing) return;

    this.isProcessing = true;

    this.authService.forgotPassword(this.accountEmail).subscribe({
      next: (response) => {
        console.log('Forgot password attempt..', response.code);
        this.dialogRef.close();
        this.isProcessing = false;
        this.snackBar.open('Na wskazany adres e-mail został wysłany link do utworzenia nowego hasła.', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-success'] });
      },
      error: (response) => {
        this.isProcessing = false;
        console.log('Forgot password attempt..', response.code);
        this.snackBar.open('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.', 'OK', { horizontalPosition: 'center', duration: 3000, panelClass: ['snackbar-error'] });
      },
    });
  }
}
