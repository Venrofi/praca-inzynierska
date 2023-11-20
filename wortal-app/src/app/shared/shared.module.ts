import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../material.module';
import { DiscussionPostDetailsComponent } from './components/discussion-post-details/discussion-post-details.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderSideMenuComponent } from './components/header/side-menu/header-side-menu.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { TextWithIconComponent } from './controls/text-with-icon/text-with-icon.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
    DiscussionPostDetailsComponent,
    EventDetailsComponent,
    TextWithIconComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
    DiscussionPostDetailsComponent,
    EventDetailsComponent,
    TextWithIconComponent,
  ],
})
export class SharedModule { }
