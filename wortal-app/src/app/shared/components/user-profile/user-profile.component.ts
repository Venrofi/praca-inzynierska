import { Component, Input, OnInit } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Member } from 'src/app/core/core.model';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../core/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  user!: Observable<Member | undefined>;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.user = this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.userService.getUserInformation(params['id']);
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wczytywania profilu użytkownika.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as Member);
        })
      );
  }
}
