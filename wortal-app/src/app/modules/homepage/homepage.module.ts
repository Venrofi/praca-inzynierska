import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DiscussionListComponent } from './components/discussion-list/discussion-list.component';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { DiscussionPostComponent } from './components/discussion-list/post/discussion-post.component';
import { HomepageService } from './services/homepage.service';
import { HttpClientModule } from '@angular/common/http';
import { PremiereListComponent } from './components/premiere-list/premiere-list.component';
import { PremiereAlbumComponent } from './components/premiere-list/premiere-album/premiere-album.component';

@NgModule({
  declarations: [
    HomepageComponent,
    DiscussionPostComponent,
    DiscussionListComponent,
    PremiereListComponent,
    PremiereAlbumComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,

    // Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
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
