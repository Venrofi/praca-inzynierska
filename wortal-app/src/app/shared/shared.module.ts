import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationDialogComponent } from './components/authentication-dialog/authentication-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderSideMenuComponent } from './components/header/side-menu/header-side-menu.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSideMenuComponent,
    AuthenticationDialogComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSideMenuComponent,
    AuthenticationDialogComponent,
    UserProfileComponent,
  ],
})
export class SharedModule { }
