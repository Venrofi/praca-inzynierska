import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtistRoutingModule } from './artist-routing.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    ArtistProfileComponent,
    ArtistsListComponent,
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,

    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ]
})
export class ArtistModule { }
