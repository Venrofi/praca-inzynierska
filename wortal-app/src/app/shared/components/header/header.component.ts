import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/authentication.service';
import { Member } from 'src/app/core/core.model';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isWideScreen: boolean = window.innerWidth > 700;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 700;
  }

  member: Member | undefined;

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userID = localStorage.getItem('user');

    if (userID) {
      this.getMemberInformation(userID);
    }
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/');
  }

  memberButtonAction(): void {
    if (this.member) {
      this.router.navigateByUrl('/member');
    }
    else {
      this.openAuthenticationDialog();
    }
  }

  memberLogout(): void {
    this.authService.logout();
    this.member = undefined;
    this.router.navigateByUrl('/');
  }

  openAuthenticationDialog(): void {
    const authDialogRef = this.dialog.open(AuthenticationDialogComponent, { width: '90vw', maxWidth: '500px' });

    authDialogRef.afterClosed().pipe(
      switchMap(userID => {
        if (userID) {
          return this.authService.getAuthenticatedUserInformation(userID);
        }

        return of(undefined);
      })
    ).subscribe(user => this.member = user);
  }

  getMemberInformation(userID: string): void {
    this.authService.getAuthenticatedUserInformation(userID).subscribe(user => this.member = user);
  }
}
