import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html'
})
export class AuthenticationDialogComponent implements OnInit {

  captchaKey = '6LepIwspAAAAABSSutqFK1NovK_2kctg8PgZD17K';

  reCaptcha!: string;

  loginCredentials!: LoginCredentials;

  registerCredentials!: RegisterCredentials;

  authType: 'LOGIN' | 'REGISTER' = 'LOGIN';

  loginPasswordVisible = false;

  passwordVisible = false;

  confirmPasswordVisible = false;

  isProcessing = false;

  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthenticationDialogComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginCredentials = {
      username: '',
      password: '',
    };
    this.registerCredentials = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    };
  }

  authenticate(): void {
    this.authService.login(this.loginCredentials).subscribe({
      next: (response) => {
        console.log('Login attempt..', response.code);
        this.authService.setLoggedInUser(response.userID);
        this.authService.notifyLoginSuccess();
        this.dialogRef.close(response.userID);
      },
      error: (response) => {
        console.log('Login failed..', response.error.code);
        switch (response.error.code) {
          case 'not-found': {
            this.snackBar.open('Użytkownik nie istnieje!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'user-not-verified': {
            this.snackBar.open('Użytkownik nie został zweryfikowany!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'wrong-password': {
            this.snackBar.open('Niepoprawne hasło!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          default: {
            this.snackBar.open('Nieznany błąd!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
        }
      }
    });
  }

  register(): void {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.authService.register(this.registerCredentials).subscribe({
      next: (response) => {
        console.log('Register attempt..', response);
        this.dialogRef.close();
        this.isProcessing = false;
        this.snackBar.open('Rejestracja pomyślna! Sprawdź pocztę pod wskazanym adresem e-mail w celu weryfikacji konta.', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-success'] });
      },
      error: (response) => {
        console.log('Register failed..', response.error);
        this.isProcessing = false;

        switch (response.error.code) {
          case 'username-already-used': {
            this.snackBar.open('Taki Użytkownik istnieje!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'email-already-used': {
            this.snackBar.open('Taki e-mail został już użyty!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'password-missmatch': {
            this.snackBar.open('Hasła nie są takie same!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'password-length': {
            this.snackBar.open('Hasło musi zawierać przynajmniej 8 znaków!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          default: {
            this.snackBar.open('Nieznany błąd!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
        }
      }
    });
  }

  forgotPassword(): void {
    this.dialogRef.close();
    this.dialog.open(ForgotPasswordDialogComponent, { width: '90vw', maxWidth: '500px' });
  }

  onPasswordChange(): void {
    const confirmPasswordControl = this.registerForm.controls['passwordRegisterConfirm'];

    if (!confirmPasswordControl) return;

    if (confirmPasswordControl.dirty && confirmPasswordControl.value) {
      if (this.registerCredentials.password !== this.registerCredentials.confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMissmatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onConfirmPasswordChange(): void {
    const confirmPasswordControl = this.registerForm.controls['passwordRegisterConfirm'];

    if (!confirmPasswordControl) return;

    if (confirmPasswordControl.dirty && confirmPasswordControl.value) {
      if (this.registerCredentials.password !== this.registerCredentials.confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMissmatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onEmailChange(): void {
    const emailControl = this.registerForm.controls['email'];

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

}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}
