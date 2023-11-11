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
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { DiscussionPostDetailsComponent } from './components/discussion-post-details/discussion-post-details.component';
import { NgxCaptchaModule } from "ngx-captcha";
import { VerificationDialogComponent } from './components/verification-dialog/verification-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSideMenuComponent,
    AuthenticationDialogComponent,
    UserProfileComponent,
    ArtistProfileComponent,
    GroupProfileComponent,
    DiscussionPostDetailsComponent,
    VerificationDialogComponent,
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

    // ReCaptcha
    NgxCaptchaModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSideMenuComponent,
    AuthenticationDialogComponent,
    UserProfileComponent,
    ArtistProfileComponent,
    GroupProfileComponent,
  ],
})
export class SharedModule { }
