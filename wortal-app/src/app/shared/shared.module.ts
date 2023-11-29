import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../material.module';
import { DiscussionPostDetailsComponent } from './components/discussion-post-details/discussion-post-details.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderSideMenuComponent } from './components/header/side-menu/header-side-menu.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { TextWithIconComponent } from './controls/text-with-icon/text-with-icon.component';
import { ContentDetailsService } from './services/content-details.service';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchService } from './services/search.service';
import { TruncateTextDirective } from './directives/truncate-text.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
    DiscussionPostDetailsComponent,
    EventDetailsComponent,
    TextWithIconComponent,
    SearchResultsComponent,
    TruncateTextDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSideMenuComponent,
    UserProfileComponent,
    DiscussionPostDetailsComponent,
    EventDetailsComponent,
    TextWithIconComponent,
    SearchResultsComponent,
  ],
  providers: [
    ContentDetailsService,
    SearchService,
    DatePipe,
  ],
})
export class SharedModule { }
