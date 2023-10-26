import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html'
})
export class AuthenticationDialogComponent implements OnInit {

  loginCredentials!: LoginCredentials;

  registerCredentials!: RegisterCredentials;

  authType: 'LOGIN' | 'REGISTER' = 'LOGIN';

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AuthenticationDialogComponent>) { }

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
    const response = this.authService.login(this.loginCredentials.username, this.loginCredentials.password);
    console.log(response);

    if (response.success) {
      this.dialogRef.close();
    }
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
