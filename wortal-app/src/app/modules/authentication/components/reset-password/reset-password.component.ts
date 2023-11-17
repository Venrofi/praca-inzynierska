import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordRequest } from 'src/app/core/api.model';
import { AuthService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetData!: ResetPasswordRequest;

  passwordVisible = false;

  confirmPasswordVisible = false;

  isProcessing = false;

  @ViewChild('resetPasswordForm') resetPasswordForm!: NgForm;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    this.resetData = {
      token: token,
      password: '',
      confirmPassword: '',
    };
  }

  onConfirmPasswordChange(): void {
    const confirmPasswordControl = this.resetPasswordForm.controls['confirmPassword'];

    if (!confirmPasswordControl) return;

    if (confirmPasswordControl.dirty && confirmPasswordControl.value) {
      if (this.resetData.password !== this.resetData.confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMissmatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  reset() {
    if (this.isProcessing) return;

    console.log('Resetting password..', this.resetData);
    if (!this.resetData.token) {
      this.snackBar.open('Brak tokenu!', 'OK', { duration: 3000, horizontalPosition: 'center', panelClass: ['snackbar-error'] });
      return;
    }

    this.isProcessing = true;

    this.authService.resetPassword(this.resetData).subscribe({
      next: (response) => {
        console.log('Password reset attempt..', response.code);
        this.snackBar.open('Hasło zostało zmienione!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-success'] });
        this.router.navigate(['/']);
        this.isProcessing = false;
      },
      error: (response) => {
        console.log('Password reset failed..', response.error.code);
        this.isProcessing = false;
        switch (response.error.code) {
          case 'password-missmatch': {
            this.snackBar.open('Hasła nie są takie same!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'password-length': {
            this.snackBar.open('Hasło musi zawierać przynajmniej 8 znaków!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
            break;
          }
          case 'invalid-token': {
            this.snackBar.open('Niepoprawny token!', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-error'] });
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
}
