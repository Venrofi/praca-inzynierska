import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistProfileComponent } from './components/artist-profile/artist-profile.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';


const routes: Routes = [
  {
    path: '',
    component: ArtistProfileComponent
  },
  {
    path: 'album',
    component: AlbumDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
