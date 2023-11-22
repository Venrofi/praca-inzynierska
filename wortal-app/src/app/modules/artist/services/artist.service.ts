import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from "../../../../enviroments/enviroment";
import { Artist } from "../../../core/core.model";

@Injectable()
export class ArtistService {
  private API_ROOT = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getArtistsList(): Observable<Artist[]> {
    // return this.http.get<Artist[]>(`${this.API_ROOT}/List/artists`);
    return this.http.get<Artist[]>('https://backend-hip-hop-hub.azurewebsites.net/artists'); // TODO: Wrong API endpoint address!
  }

  getArtistInformation(artistID: string) {
    const params = new HttpParams().set('artistId', artistID);

    // return this.http.get<Artist>(`${this.API_ROOT}/Details/artist`, { params });
    return this.http.get<Artist[]>('assets/data/artists.json').pipe(
      map((artists: Artist[]) => {
        return artists.find((artist: Artist) => artist.id === artistID);
      })
    );
  }
}
