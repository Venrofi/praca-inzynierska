import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from "../../../../enviroments/enviroment";
import { Artist, ArtistList } from "../../../core/core.model";
import { AuthService } from "src/app/core/authentication.service";

@Injectable()
export class ArtistService {
  private API_ROOT = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getArtistsList(): Observable<ArtistList[]> {
    // return this.http.get<Artist[]>(`${this.API_ROOT}/List/artists`);
    return this.http.get<ArtistList[]>('https://backend-hip-hop-hub.azurewebsites.net/artists')
      .pipe(
        map((artists: ArtistList[]) => {
          return artists.map((artist: ArtistList, index: number) => {
            return {
              ...artist,
              image: this.generateRandomAvatar(),
              rank: (index + 1).toString(),
            };
          });
        })
      ); // TODO: Wrong API endpoint address!
  }

  getArtistInformation(artistID: string) {
    const params = new HttpParams().set('artistId', artistID);

    return this.http.get<Artist>(`https://backend-hip-hop-hub.azurewebsites.net/artist`, { params })
      .pipe(
        map((artist: Artist) => {
          return {
            ...artist,
            image: this.generateRandomAvatar(),
            albums: artist.albums.map(album => {
              return {
                ...album,
                cover: this.generateRandomAvatar(),
              };
            }),
          }
        })
      ); // TODO: Wrong API endpoint address!
    // return this.http.get<Artist[]>('assets/data/artists.json').pipe(map(artists => artists.find(artist => artist.id === '1')));
  }

  followArtist(artistID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('artistId', artistID).set('userId', userId);

    return this.http.post(`https://backend-hip-hop-hub.azurewebsites.net/follow`, {}, { params }); // TODO: Wrong API endpoint address!
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
