import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html'
})
export class VerificationDialogComponent {

  @Input({ required: true }) verificationToken!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<VerificationDialogComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.verificationToken = this.data?.verificationToken;
  }

  verify(): void {
    this.authService.verify(this.verificationToken).subscribe({
      next: () => {
        this.dialogRef.close();
        this.snackBar.open('Weryfikacja pomyślna!', 'OK', { duration: 3000, horizontalPosition: 'center', panelClass: ['snackbar-success'] });
      },
      error: (response) => {
        console.log('Verification failed..', response.error.code);

        switch (response.error.code) {
          case 'wrong-token': {
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
