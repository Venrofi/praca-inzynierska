import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { StoreModel } from 'src/app/app-state.model';
import { AuthService } from 'src/app/core/authentication.service';
import { Member } from 'src/app/core/core.model';
import * as memberActions from '../../../store/member/member.actions';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private store: Store<StoreModel>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const userID = localStorage.getItem('user');

    if (userID) {
      this.getMemberInformation(userID);
    }

    this.store.subscribe(store => {
      this.member = store.app.member;
    });

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
    this.store.dispatch(memberActions.update({ member: undefined }));
    this.router.navigateByUrl('/');
    this.snackBar.open('Zostałeś wylogowany', 'OK', { duration: 2000, horizontalPosition: 'end' });
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
    ).subscribe(user => {
      if(user) {
        this.store.dispatch(memberActions.update({ member: user as Member }));
        this.snackBar.open('Zalogowano pomyślnie!', 'OK', { duration: 2000, horizontalPosition: 'end' });
      }
    });
  }

  getMemberInformation(userID: string): void {
    this.authService.getAuthenticatedUserInformation(userID).subscribe(user => {
      this.store.dispatch(memberActions.update({ member: user as Member }));
    });
  }
}
