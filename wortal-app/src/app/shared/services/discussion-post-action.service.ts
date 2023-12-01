import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from "../../../enviroments/enviroment";
import { AddCommentResponse, CreateDiscussionPostRequest } from "../../core/api.model";
import { AuthService } from "../../core/authentication.service";
import { BaseWortalElement } from "../../core/core.model";

@Injectable()
export class DiscussionPostActionService {

  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  createNewDiscussion(request: CreateDiscussionPostRequest): Observable<any> {
    const authorId = this.authService.getLoggedInUser() || '';

    return this.http.post(`${this.API_ROOT}/Discussionpost/create`, request);
  }

  createNewDiscussionInitData(): Observable<BaseWortalElement[]> {
    const authorId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('id', authorId);

    return this.http.post<BaseWortalElement[]>(`${this.API_ROOT}/Discussionpost/init-create-data`, {}, { params });
  }

  addComment(discussionPostId: string, content: string): Observable<AddCommentResponse> {
    const authorId = this.authService.getLoggedInUser() || '';

    return this.http.post<AddCommentResponse>(`${this.API_ROOT}/Discussionpost/add-comment`, { discussionPostId, authorId, content }).pipe(
      map((response: AddCommentResponse) => {
        return {
          ...response,
          createdComment: {
            ...response.createdComment,
            author: {
              ...response.createdComment.author,
              avatar: this.generateRandomAvatar(),
            }
          }
        }
      })
    );
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 100 + 200); // returns a random number between 200 and 300

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
