import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from 'src/app/material.module';
import { ArtistRoutingModule } from './artist-routing.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { ArtistService } from "./services/artist.service";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    ArtistProfileComponent,
    ArtistsListComponent,
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedMaterialModule,
    SharedModule,
  ],
  providers: [
    ArtistService,
  ],
})
export class ArtistModule { }
