import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { DiscussionPost } from '../../homepage.model';
import { HomepageService } from '../../services/homepage.service';
import { AuthService } from "../../../../core/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
})
export class DiscussionListComponent implements OnInit {

  discussionList!: Observable<DiscussionPost[]>;

  constructor(private homepageService: HomepageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.discussionList = this.homepageService.getDiscussionList();

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser() || undefined;
      this.discussionList = this.homepageService.getDiscussionList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.discussionList = this.homepageService.getDiscussionList();
    });
  }

  navigateToTopicForum(topic: string) {
    console.log(`Navigate to topic forum with all existing posts at: /forum/${topic}`);
  }

  navigateToAuthorProfile(author: string) {
    this.router.navigate(['/user'], { queryParams: { id: author } }).catch(noop);
  }

  openPostModal(post: DiscussionPost) {
    console.log(`Open post modal at: /forum/${post.topic}/${post.id}`);
  }
}
