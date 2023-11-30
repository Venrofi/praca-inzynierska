import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from "../../../../enviroments/enviroment";
import { Artist, ArtistList } from "../../../core/core.model";
import { AuthService } from "src/app/core/authentication.service";
import { AlbumDetails } from "../../homepage/homepage.model";

@Injectable()
export class ArtistService {
  private API_ROOT = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getArtistsList(): Observable<ArtistList[]> {
    return this.http.get<ArtistList[]>(`${this.API_ROOT}/List/artists`)
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
      );
  }

  getArtistInformation(artistID: string) {
    const params = new HttpParams().set('id', artistID);

    return this.http.get<Artist>(`${this.API_ROOT}/Details/artist`, { params })
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
      );
  }

  getAlbumDetails(albumID: string) {
    const params = new HttpParams().set('id', albumID);

    return this.http.get<AlbumDetails>(`${this.API_ROOT}/Details/album`, { params }).pipe(
      map((album: AlbumDetails) => {
        return {
          ...album,
          cover: this.generateRandomCover(),
        }
      })
    );
  }

  followArtist(artistID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('artistId', artistID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/follow`, {}, { params });
  }

  unfollowArtist(artistID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('artistId', artistID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/unfollow`, {}, { params });
  }

  private generateRandomCover(): string {
    const randomImageSize = Math.floor(Math.random() * 200 + 400); // returns a random number between 400 and 600

    return `https://picsum.photos/${randomImageSize * 2}/${randomImageSize}`;
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
