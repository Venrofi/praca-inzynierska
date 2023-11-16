import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DiscussionPost, HomepageSideRecommendations, PremiereAlbum } from '../homepage.model';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/core/core.model';
import { environment } from 'src/enviroments/enviroment';

@Injectable()
export class HomepageService {
  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/discussion-posts`, { params });
  }

  getPremiereList(userID?: string): Observable<PremiereAlbum[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/premiere-albums`, { params }).pipe(
      map(data => {
        return data.map((album: any) => {
          const randomCoverSize = Math.floor(Math.random() * 100 + 500); // returns a random number between 500 and 600
          return {
            id: album.premiereAlbumId,
            title: album.title,
            artist: {
              id: album.artistProfileId,
              name: album.artist,
            },
            cover: album.cover || `https://picsum.photos/${randomCoverSize}/${randomCoverSize * 2}`,
            releaseDate: album.releaseDate,
          };
        });
      }) // TODO: Fix mapping, currently data returned from server is not in PremiereAlbum format
    );

    // return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/events`, { params }).pipe(
      map(data => {
        return data.map((event: any) => {
          return {
            id: event.eventId,
            name: event.title,
            image: event.cover,
            date: event.date,
            location: event.location,
            description: event.description,
            promoter: [],
            participants: [],
          };
        });
      }) //TODO: Fix mapping, currently data returned from server is not in Event format
    );
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/side-recommendations`, { params }).pipe(
      map(data => {
        return {
          topDiscussions: {
            title: data.topDiscussions.title,
            content: data.topDiscussions.content.value
          },
          topArtists: {
            title: data.topArtists.title,
            content: data.topArtists.content.value
          },
          topMembers: {
            title: data.topMembers.title,
            content: data.topMembers.content.value
          },
          topGroups: {
            title: 'Najpopularniejsze grupy',
            content: []
          },
        };
      }) //TODO: Fix mapping, currently data returned from server is not in HomepageSideRecommendations format, NO TOP GROUPS!
    );

    // return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }
}
