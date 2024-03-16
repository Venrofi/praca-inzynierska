import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable, map } from "rxjs";
import { AuthService } from "src/app/core/authentication.service";
import { environment } from "../../../../environments/environment";
import { Artist, ArtistList } from "../../../core/core.model";
import { AlbumBasicDetails, AlbumDetails } from "../../homepage/homepage.model";

@Injectable()
export class ArtistService {
  private API_ROOT = environment.apiBaseUrl;

  private artistsCollection: AngularFirestoreCollection<Artist>;

  private albumsCollection: AngularFirestoreCollection<AlbumDetails>;

  constructor(private http: HttpClient, private authService: AuthService, private firestore: AngularFirestore) {
    this.artistsCollection = this.firestore.collection<Artist>('artists');
    this.albumsCollection = this.firestore.collection<AlbumDetails>('albums');
  }

  getArtistsList(): Observable<ArtistList[]> {
    return this.http.get<ArtistList[]>(`${this.API_ROOT}/List/artists`)
      .pipe(
        map((artists: ArtistList[]) => {
          return artists.map((artist: ArtistList, index: number) => {
            return {
              ...artist,
              image: artist.image || this.generateRandomAvatar(),
              rank: (index + 1).toString(),
            };
          });
        })
      );
  }

  getArtistInformation(artistID: string) {
    return this.artistsCollection.doc(artistID).valueChanges();
  }

  getArtistAlbums(albumIDs: string[]) {
    return this.albumsCollection.snapshotChanges().pipe(
      map((albums) => {
        return albums
          .map((album) => {
            const { name, artist, cover, releaseDate } = album.payload.doc.data();
            const id = album.payload.doc.id;
            return { id, name, artist, cover, releaseDate } as AlbumBasicDetails;
          })
          .filter((album) => albumIDs.includes(album.id));
      })
    );
  }

  getAlbumDetails(albumID: string) {
    return this.albumsCollection.doc(albumID).snapshotChanges().pipe(
      map((album) => {
        const { name, artist, cover, releaseDate, duration, description, genre, rating, tracks } = album.payload.data() || {};
        const id = album.payload.id;

        return {
          id,
          name,
          artist,
          cover: cover || this.generateRandomCover(),
          releaseDate,
          duration,
          description,
          genre,
          rating,
          tracks,
        } as AlbumDetails;
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
