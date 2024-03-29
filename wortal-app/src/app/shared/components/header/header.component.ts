import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap } from 'rxjs';
import { StoreModel } from 'src/app/app-state.model';
import { AuthService } from 'src/app/core/authentication.service';
import { Member } from 'src/app/core/core.model';
import { CreateNewGroupDialogComponent } from 'src/app/modules/group/components/create-new-group-dialog/create-new-group-dialog.component';
import { UserService } from "../../../core/user.service";
import { AuthenticationDialogComponent } from '../../../modules/authentication/components/authentication-dialog/authentication-dialog.component';
import * as memberActions from '../../../store/member/member.actions';
import { DiscussionPostActionService } from "../../../modules/group/services/discussion-post-action.service";
import { CreateDiscussionPostDialogComponent } from "../../../modules/group/components/create-discussion-post-dialog/create-discussion-post-dialog.component";

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

  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private discussionPostActionService: DiscussionPostActionService,
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
    this.snackBar.open('Zostałeś wylogowany', 'OK', { duration: 2000, horizontalPosition: 'end', panelClass: ['snackbar-success'] });
  }

  openAuthenticationDialog(): void {
    const authDialogRef = this.dialog.open(AuthenticationDialogComponent, { width: '90vw', maxWidth: '500px' });

    authDialogRef.afterClosed().pipe(
      switchMap(userID => {
        if (userID) {
          return this.userService.getAuthenticatedUserInformation(userID);
        }
        return of(undefined);
      })
    ).subscribe(user => {
      if (user) {
        this.store.dispatch(memberActions.update({ member: user as Member }));
        this.snackBar.open('Zalogowano pomyślnie!', 'OK', { duration: 2000, horizontalPosition: 'end', panelClass: ['snackbar-success'] });
      }
    });
  }

  openCreateDiscussionDialog() {
    this.discussionPostActionService.createNewDiscussionInitData().subscribe({
      next: (response) => {
        this.dialog.open(CreateDiscussionPostDialogComponent, { width: '90vw', maxWidth: '500px', data: response });
      },
      error: () => {
        this.snackBar.open('Nie można stworzyć nowej dyskusji!', 'OK', { duration: 3000, horizontalPosition: 'end', panelClass: ['snackbar-error'] });
      }
    })
  }

  openCreateNewGroupDialog(): void {
    this.dialog.open(CreateNewGroupDialogComponent, { width: '90vw', maxWidth: '500px' });
  }

  getMemberInformation(userID: string): void {
    this.userService.getAuthenticatedUserInformation(userID).subscribe(user => {
      this.store.dispatch(memberActions.update({ member: user as Member }));
    });
  }
}
