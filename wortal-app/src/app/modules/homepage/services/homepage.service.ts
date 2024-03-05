import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { Event } from 'src/app/core/core.model';
import { environment } from 'src/enviroments/enviroment';
import { Album, DiscussionPost, HomepageSideRecommendations } from '../homepage.model';

@Injectable()
export class HomepageService {
  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<DiscussionPost[]>(`${this.API_ROOT}/homepage--discussion-posts`, { params }).pipe(
      delay(1000),
      map((posts: DiscussionPost[]) => {
        return posts.map(post => {
          return {
            ...post,
            author: {
              ...post.author,
              avatar: post.author.avatar || this.generateRandomAvatar(),
            }
          };
        })
      })
    );
  }

  getPremiereList(userID?: string): Observable<Album[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Album[]>(`${this.API_ROOT}/homepage--premiere-albums?_limit=9`, { params }).pipe(
      delay(1000),
      map((albums: Album[]) => albums.slice(0, 9)),
      map((albums: Album[]) => {
        return albums.map(album => {
          return {
            ...album,
            cover: album.cover || this.generateRandomImage(),
          };
        });
      })
    );
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Event[]>(`${this.API_ROOT}/homepage--events`, { params }).pipe(delay(1000));
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<HomepageSideRecommendations>(`${this.API_ROOT}/homepage--side-recommendations`, { params });
  }

  private generateRandomImage(): string {
    const randomImageSize = Math.floor(Math.random() * 300 + 600); // returns a random number between 600 and 900

    return `https://picsum.photos/${randomImageSize}/${randomImageSize}`;
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
