import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html'
})
export class AuthenticationDialogComponent implements OnInit {

  loginCredentials!: LoginCredentials;

  registerCredentials!: RegisterCredentials;

  authType: 'LOGIN' | 'REGISTER' = 'LOGIN';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthenticationDialogComponent>,
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
    // const response = this.authService.register(this.registerCredentials.username, this.registerCredentials.password, this.registerCredentials.email);
    console.log('Register attempt');
  }

}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}
