import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/core/authentication.service";
import { environment } from "../../../../enviroments/enviroment";
import { Group, GroupList } from "../../../core/core.model";

@Injectable()
export class GroupService {
  private API_ROOT = environment.apiBaseUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getGroupsList(): Observable<GroupList[]> {
    return this.http.get<GroupList[]>(`${this.API_ROOT}/List/groups`)
      .pipe(
        map((groups: GroupList[]) => {
          return groups.map((group: GroupList, index: number) => {
            return {
              ...group,
              image: this.generateRandomAvatar(),
              rank: (index + 1).toString(),
            };
          });
        })
      );
  }

  getGroupInformation(groupID: string) {
    const params = new HttpParams().set('id', groupID);

    return this.http.get<Group>(`${this.API_ROOT}/Details/group`, { params })
      .pipe(
        map((group: Group) => {
          return {
            ...group,
            image: this.generateRandomAvatar(),
          }
        })
      );
  }

  joinGroup(groupID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('groupId', groupID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/join`, {}, { params });
  }

  unjoinGroup(groupID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('groupId', groupID).set('userId', userId);

    return this.http.post(`${this.API_ROOT}/Action/unjoin`, {}, { params });
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
