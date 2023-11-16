import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map } from 'rxjs';
import { Artist } from 'src/app/core/core.model';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getArtistInformation(artistID: string) {
    // return this.http.get<Artist>(`${this.API_ROOT}/Artists/${artistID}`);
    return this.http.get<Artist[]>('assets/data/artists.json').pipe(
      map((artists: Artist[]) => {
        return artists.find((artist: Artist) => artist.id === artistID);
      })
    );
  }
}
