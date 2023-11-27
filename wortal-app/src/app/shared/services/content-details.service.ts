import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/authentication.service';
import { Event } from 'src/app/core/core.model';
import { DiscussionPost } from 'src/app/modules/homepage/homepage.model';
import { environment } from 'src/enviroments/enviroment';

@Injectable()
export class ContentDetailsService {

  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getEventDetails(eventID: string): Observable<Event> {
    const params = new HttpParams().set('id', eventID);

    return this.http.get<Event>(`${this.API_ROOT}/Details/event`, { params })
      .pipe(
        map((event: Event) => {
          return {
            ...event,
            image: this.generateRandomImage(),
          }
        })
      );
  }

  attendEvent(eventID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('eventId', eventID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/attend`, {}, { params });
  }

  unAttendEvent(eventID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('eventId', eventID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/unattend`, {}, { params });
  }

  getDiscussionPostDetails(postID: string): Observable<DiscussionPost> {
    const params = new HttpParams().set('id', postID);

    return this.http.get<DiscussionPost>(`${this.API_ROOT}/Details/discussion`, { params });
  }

  private generateRandomImage(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 600); // returns a random number between 600 and 900

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
