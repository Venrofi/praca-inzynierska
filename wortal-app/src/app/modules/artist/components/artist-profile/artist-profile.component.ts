import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Artist, Member } from 'src/app/core/core.model';
import { ArtistService } from "../../services/artist.service";
import { AuthService } from 'src/app/core/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/app-state.model';
import * as memberActions from '../../../../store/member/member.actions';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
})
export class ArtistProfileComponent implements OnInit {
  artist!: Artist;

  artistFollowed: boolean = false;

  member: Member | undefined;

  constructor(
    private artistService: ArtistService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
  ) { }

  ngOnInit() {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.route.queryParams.pipe(
      switchMap(params => {
        return this.artistService.getArtistInformation(params['id'])
      })
    ).subscribe(artist => {
      this.artist = artist;
      this.artist.followers.find(follower => follower.id === this.member?.id) ? this.artistFollowed = true : this.artistFollowed = false;
    });
  }

  openAlbumModal(albumId: string) {
    console.log(`Open album #${albumId}`); // TODO: Implement AlbumModal
  }

  followArtist(artistId: string) {
    this.artistService.followArtist(artistId).subscribe({
      next: () => {
        if (this.member) {
          this.artistFollowed = true;

          // Update local state
          this.artist.followers.push({ id: this.member?.id, name: this.member?.name });
          this.member.followedArtists.push({ id: this.artist.id, name: this.artist.name });

          // Update global store state
          this.store.dispatch(memberActions.update({ member: this.member }));

          this.snackBar.open('Zaobserwowałeś tego artystę!', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        }
      },
      error: () => {
        this.snackBar.open('Wystąpił błąd podczas próby zaobserwowania tego artysty!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    });
  } // TODO: Add error handling and toast notifications!
}
