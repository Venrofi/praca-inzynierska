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

    return this.http.get<DiscussionPost[]>(`${this.API_ROOT}/MainPage/discussion-posts`, { params }).pipe(
      map((posts: DiscussionPost[]) => {
        return posts.map(post => {
          return {
            ...post,
            author: {
              ...post.author,
              avatar: this.generateRandomAvatar(),
            }
          };
        })
      })
    );
  }

  getPremiereList(userID?: string): Observable<PremiereAlbum[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<PremiereAlbum[]>(`${this.API_ROOT}/MainPage/premiere-albums`, { params }).pipe(
      map((albums: PremiereAlbum[]) => {
        return albums.map(album => {
          return {
            ...album,
            cover: this.generateRandomAvatar(),
          };
        });
      })
    );

    // return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Event[]>(`${this.API_ROOT}/MainPage/events`, { params });
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<HomepageSideRecommendations>(`${this.API_ROOT}/MainPage/side-recommendations`, { params });

    // return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
