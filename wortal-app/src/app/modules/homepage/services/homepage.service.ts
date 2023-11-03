import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { DiscussionPost, Event, HomepageSideRecommendations, PremiereAlbum } from '../homepage.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HomepageService {

  constructor(private http: HttpClient) { }

  // TODO: remove delays, add userID as a query parameter
  getDiscussionList(userID?: string): Observable<DiscussionPost[]> {
    return this.http.get<DiscussionPost[]>('assets/data/discussion-posts.json').pipe(delay(1000));
  }

  getPremiereList(userID?: string): Observable<PremiereAlbum[]> {
    return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

  getEventList(userID?: string): Observable<Event[]> {
    return this.http.get<Event[]>('assets/data/events.json').pipe(delay(1000));
  }

  getSideRecommendations(userID?: string): Observable<HomepageSideRecommendations> {
    return this.http.get<any>('assets/data/side-recommendations.json').pipe(delay(1000));
  }
}
