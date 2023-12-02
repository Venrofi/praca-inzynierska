import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DiscussionListComponent } from './components/discussion-list/discussion-list.component';
import { DiscussionPostComponent } from './components/discussion-list/post/discussion-post.component';
import { EventComponent } from './components/events-list/event/event.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PremiereAlbumComponent } from './components/premiere-list/premiere-album/premiere-album.component';
import { PremiereListComponent } from './components/premiere-list/premiere-list.component';
import { SideRecommendationsComponent } from './components/side-recommendations/side-recommendations.component';
import { HomepageService } from './services/homepage.service';
import { ContentDetailsService } from 'src/app/shared/services/content-details.service';

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
    SharedMaterialModule,
  ],
  exports: [
    HomepageComponent,
    DiscussionPostComponent,
    DiscussionListComponent,
  ],
  providers: [
    HomepageService,
    ContentDetailsService,
  ],
})
export class HomepageModule { }
