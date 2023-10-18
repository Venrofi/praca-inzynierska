import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { DiscussionPost, PremiereAlbum } from '../homepage.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HomepageService {

  constructor(private http: HttpClient) { }

  // TODO: remove delays
  getDiscussionList(): Observable<DiscussionPost[]> {
    return this.http.get<DiscussionPost[]>('assets/data/discussion-posts.json').pipe(delay(1000));
  }

  getPremiereList(): Observable<PremiereAlbum[]> {
    return this.http.get<PremiereAlbum[]>('assets/data/premiere-albums.json').pipe(delay(1000));
  }

}

