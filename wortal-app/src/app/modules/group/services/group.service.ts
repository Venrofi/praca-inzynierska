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
    // return this.http.get<Artist[]>(`${this.API_ROOT}/List/groups`);
    return this.http.get<GroupList[]>('https://backend-hip-hop-hub.azurewebsites.net/groups')
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
      ); // TODO: Wrong API endpoint address!
  }

  getGroupInformation(groupID: string) {
    const params = new HttpParams().set('groupId', groupID);

    return this.http.get<Group>(`https://backend-hip-hop-hub.azurewebsites.net/group`, { params })
      .pipe(
        map((group: Group) => {
          return {
            ...group,
            image: this.generateRandomAvatar(),
          }
        })
      ); // TODO: Wrong API endpoint address!
  }

  joinGroup(groupID: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('groupId', groupID).set('userId', userId);

    return this.http.post(`https://backend-hip-hop-hub.azurewebsites.net/join`, {}, { params }); // TODO: Wrong API endpoint address!
  }

  private generateRandomAvatar(): string {
    const randomAvatarSize = Math.floor(Math.random() * 300 + 200); // returns a random number between 200 and 400

    return `https://picsum.photos/${randomAvatarSize}/${randomAvatarSize}`;
  }
}
