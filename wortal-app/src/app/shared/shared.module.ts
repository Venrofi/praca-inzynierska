import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DiscussionPostDetailsComponent } from './components/discussion-post-details/discussion-post-details.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderSideMenuComponent } from './components/header/side-menu/header-side-menu.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { EventDetailsComponent } from './components/event-details/event-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
    DiscussionPostDetailsComponent,
    EventDetailsComponent,
  ],
  imports: [
    CommonModule,

    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
  ],
})
export class SharedModule { }
