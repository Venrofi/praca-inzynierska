import { Injectable } from "@angular/core";
import { AuthService } from "./authentication.service";
import { Observable, of } from "rxjs";
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

    return this.http.get<any>(`${this.API_ROOT}/Users/basic-user-information`, { params }); //TODO: Add error handling
  }
}
