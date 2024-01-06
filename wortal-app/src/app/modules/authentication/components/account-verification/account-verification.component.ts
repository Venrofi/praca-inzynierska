import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './account-verification.component.html'
})
export class AccountVerificationComponent {

  isProcessing = false;

  loadingDotsCount = 0;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const verificationToken: string = this.route.snapshot.queryParams['token'];

    setInterval(() => {
      this.loadingDotsCount = (this.loadingDotsCount + 1) % 4; // Change number of dots (between 0 to 3) every 300ms
    }, 300);

    this.verify(verificationToken);
  }

  verify(token: string): void {
    if (this.isProcessing) return;

    this.isProcessing = true;

    this.authService.verify(token).subscribe({
      next: () => {
        this.snackBar.open('Weryfikacja pomyślna! Konto zostało aktywowane. Możesz się zalogować :)', 'OK', { horizontalPosition: 'center', panelClass: ['snackbar-success'] });

        this.isProcessing = false;
        this.router.navigate(['/']);
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

        this.isProcessing = false;
        this.router.navigate(['/']);
      }
    });
  }
}
