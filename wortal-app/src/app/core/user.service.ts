import { Injectable } from "@angular/core";
import { AuthService } from "./authentication.service";
import { map, Observable, of } from "rxjs";
import { Member } from "./core.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_ROOT = 'https://localhost:7145/api';

  constructor(private authService: AuthService, private http: HttpClient) { }
  getAuthenticatedUserInformation(userID: string): Observable<Member | undefined> {
    if (!this.authService.isAuthenticatedUser()) return of(undefined);

    return this.getUserInformation(userID);
  }

  getUserInformation(userID: string): Observable<Member | undefined> {
    return this.http.get<any>(`${this.API_ROOT}/Users/${userID}`).pipe(
      map(data => {
        const randomAvatarSize = Math.floor(Math.random() * 200 + 200); // returns a random number between 200 and 400
        return {
          id: data.userId,
          username: data.userName,
          email: data.email,
          groups: data.groups,
          role: "USER",
          posts: data.discussionPosts,
          avatar: data.avatar || `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`
        };
      })
    ); //TODO: Add error handling, currently data returned from server is not in Member format
  }
}
