import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscussionPost } from '../homepage.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HomepageService {

  constructor(private http: HttpClient) { }

  getDiscussionList(): Observable<DiscussionPost[]> {
    return this.http.get<DiscussionPost[]>('assets/data/discussion-posts.json');
  }

}

