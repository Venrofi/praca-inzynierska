import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Member } from 'src/app/core/core.model';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../core/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {

  user!: Observable<Member | undefined>;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.queryParams.pipe(
      switchMap(params => {
        return this.userService.getUserInformation(params['id']);
      })
    );
  }
}
