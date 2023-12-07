import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { environment } from "../../../../enviroments/enviroment";
import { AddCommentResponse, BasicResponse, CreateDiscussionPostRequest, CreateDiscussionPostResponse, DeleteDiscussionPostRequest, EditDiscussionPostRequest } from "../../../core/api.model";
import { AuthService } from "../../../core/authentication.service";
import { BaseWortalElement } from "../../../core/core.model";

@Injectable()
export class DiscussionPostActionService {

  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  createNewDiscussion(request: CreateDiscussionPostRequest): Observable<CreateDiscussionPostResponse> {
    return this.http.post<CreateDiscussionPostResponse>(`${this.API_ROOT}/DiscussionPost/create`, request);
  }

  createNewDiscussionInitData(): Observable<BaseWortalElement[]> {
    const authorId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('id', authorId);

    return this.http.post<BaseWortalElement[]>(`${this.API_ROOT}/DiscussionPost/init-create-data`, {}, { params });
  }

  editDiscussionPost(request: EditDiscussionPostRequest): Observable<BasicResponse> {
    return this.http.put<BasicResponse>(`${this.API_ROOT}/DiscussionPost/edit`, request);
  }

  deleteDiscussionPost(request: DeleteDiscussionPostRequest): Observable<BasicResponse> {
    return this.http.delete<BasicResponse>(`${this.API_ROOT}/DiscussionPost/delete`, { body: request });
  }

  addComment(discussionPostId: string, content: string): Observable<AddCommentResponse> {
    const authorId = this.authService.getLoggedInUser() || '';

    return this.http.post<AddCommentResponse>(`${this.API_ROOT}/DiscussionPost/add-comment`, { discussionPostId, authorId, content }).pipe(
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
