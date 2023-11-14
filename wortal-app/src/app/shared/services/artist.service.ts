import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map } from 'rxjs';
import { API_ROOT } from 'src/app/app-routing.module';
import { Artist } from 'src/app/core/core.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getArtistInformation(artistID: string) {
    // return this.http.get<Artist>(`${API_ROOT}/Artists/${artistID}`);
    return this.http.get<Artist[]>('assets/data/artists.json').pipe(
      map((artists: Artist[]) => {
        return artists.find((artist: Artist) => artist.id === artistID);
      })
    );
  }
}
