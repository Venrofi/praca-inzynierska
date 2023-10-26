import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isWideScreen: boolean = window.innerWidth > 700;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 700;
  }

  constructor(private dialog: MatDialog) { }

  openAuthenticationDialog(): void {
    const dialogRef = this.dialog.open(AuthenticationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
