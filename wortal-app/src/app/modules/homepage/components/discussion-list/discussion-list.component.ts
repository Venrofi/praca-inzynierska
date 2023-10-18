import { Component, OnInit } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { DiscussionPost } from '../../homepage.model';
import { HomepageService } from '../../services/homepage.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
})
export class DiscussionListComponent implements OnInit {

  discussionList!: Observable<DiscussionPost[]>;

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.discussionList = this.homepageService.getDiscussionList();
  }

  navigateToTopicForum(topic: string) {
    console.log(`Navigate to topic forum with all existing posts at: /forum/${topic}`);
  }

  navigateToAuthorProfile(author: string) {
    console.log(`Navigate to author profile at: /user/${author}`);
  }

  openPostModal(post: DiscussionPost) {
    console.log(`Open post modal at: /forum/${post.topic}/${post.id}`);
  }
}
