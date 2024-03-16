import { Component } from '@angular/core';
import { AlbumDetails } from 'src/app/modules/homepage/homepage.model';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
})
export class AlbumDetailsComponent {
  album!: Observable<AlbumDetails>;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.album = this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.artistService.getAlbumDetails(params['id'])
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wczytywania szczegółów albumu.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as AlbumDetails);
        })
      );
  }

  presentAlbumDuration(duration: string): string {
    let [hours, minutes, seconds] = duration.split(':');

    if (hours.charAt(0) === '0') {
      hours = hours.slice(1);
    }

    if (minutes.charAt(0) === '0') {
      minutes = minutes.slice(1);
    }

    if (hours.includes('0')) {
      return `${minutes} min`;
    } else {
      return `${hours}h ${minutes} min`;
    }
  }
}
