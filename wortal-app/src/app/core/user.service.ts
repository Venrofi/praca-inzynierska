import { Injectable } from "@angular/core";
import { AuthService } from "./authentication.service";
import { delay, map, Observable, of } from "rxjs";
import { Member } from "./core.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private http: HttpClient) {}
  getAuthenticatedUserInformation(userID: string): Observable<Member | undefined> {
    if (!this.authService.isAuthenticatedUser()) return of(undefined);

    return this.getUserInformation(userID);
  }

  getUserInformation(userID: string): Observable<Member | undefined> {
    return this.http.get<Member[]>('assets/data/users.json')
      .pipe(
        map((users) => users.find((user) => user.id === userID)),
        delay(500)
      );
  }
}
