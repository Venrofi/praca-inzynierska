import { Injectable } from "@angular/core";
import { AuthService } from "./authentication.service";
import { Observable, map, of } from "rxjs";
import { Member } from "./core.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_ROOT = environment.apiBaseUrl;

  constructor(private authService: AuthService, private http: HttpClient) { }
  getAuthenticatedUserInformation(userID: string): Observable<Member | undefined> {
    if (!this.authService.isAuthenticatedUser()) return of(undefined);

    return this.getUserInformation(userID);
  }

  getUserInformation(userID: string): Observable<Member | undefined> {
    const params = new HttpParams().set('id', userID);

    return this.http.get<Member>(`${this.API_ROOT}/Users/basic-user`, { params }).pipe(
      map((member: Member) => {
        return {
          ...member,
          avatar: member.avatar || this.generateRandomAvatar(),
        }
      })
    ); //TODO: Add error handling
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
