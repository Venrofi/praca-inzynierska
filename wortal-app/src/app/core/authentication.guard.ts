import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    console.log('Can activate?', this.authService.isAuthenticatedUser());
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to the home page
      return false;
    }
  }
}
