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

    return this.http.get<any>(`${this.API_ROOT}/MainPage/premiere-albums`, { params });

    // return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/events`, { params });
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<any>(`${this.API_ROOT}/MainPage/side-recommendations`, { params });

    // return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }
}
