import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { DiscussionPost, Event, HomepageSideRecommendations, PremiereAlbum } from '../homepage.model';
import { Injectable } from '@angular/core';
import { API_ROOT } from 'src/app/app-routing.module';

@Injectable()
export class HomepageService {

  constructor(private http: HttpClient) { }

  // TODO: remove delays, add userID as a query parameter
  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    // return this.http.get<any>(`${API_ROOT}/MainPage/discussion-posts`, { params });

    return this.http.get<DiscussionPost[]>('assets/data/discussion-posts.json').pipe(delay(1000));
  }

  getPremiereList(userID?: string): Observable<PremiereAlbum[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    // return this.http.get<any>(`${API_ROOT}/MainPage/premiere-albums`, { params });

    return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    return this.http.get<Event[]>(`${API_ROOT}/MainPage/events`, { params });
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    const params = userID ? new HttpParams().set('id', userID) : undefined;

    // return this.http.get<any>(`${API_ROOT}/MainPage/side-recommendations`, { params });

    return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }
}
