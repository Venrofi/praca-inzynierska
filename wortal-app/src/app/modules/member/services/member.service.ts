import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, map } from "rxjs";
import { environment } from "../../../../enviroments/enviroment";
import { Member, MemberList } from "../../../core/core.model";
import { UpdateMemberRequest } from "src/app/core/api.model";

@Injectable()
export class MemberService {
  private API_ROOT = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getMembersList(): Observable<MemberList[]> {
    return this.http.get<MemberList[]>(`${this.API_ROOT}/List/members`)
      .pipe(
        map((members: MemberList[]) => {
          return members.map((member: MemberList, index: number) => {
            return {
              ...member,
              avatar: this.generateRandomAvatar(),
              rank: (index + 1).toString(),
            };
          });
        })
      );
  }

  updateMember(request: UpdateMemberRequest): Observable<Member> {
    return this.http.put<Member>(`${this.API_ROOT}/Users/update-user`, request);
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
