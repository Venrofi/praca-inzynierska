import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { DiscussionListComponent } from './components/discussion-list/discussion-list.component';
import { DiscussionPostComponent } from './components/discussion-list/post/discussion-post.component';
import { EventComponent } from './components/events-list/event/event.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PremiereAlbumComponent } from './components/premiere-list/premiere-album/premiere-album.component';
import { PremiereListComponent } from './components/premiere-list/premiere-list.component';
import { HomepageService } from './services/homepage.service';
import { SideRecommendationsComponent } from './components/side-recommendations/side-recommendations.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomepageComponent,
    DiscussionPostComponent,
    DiscussionListComponent,
    PremiereListComponent,
    PremiereAlbumComponent,
    EventsListComponent,
    EventComponent,
    SideRecommendationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    // Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    HomepageComponent,
    DiscussionPostComponent,
    DiscussionListComponent
  ],
  providers: [
    HomepageService
  ],
})
export class HomepageModule { }
