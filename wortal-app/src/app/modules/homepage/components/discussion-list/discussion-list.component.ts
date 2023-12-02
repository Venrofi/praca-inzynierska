import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';
import { DiscussionPost, DiscussionPostTopic } from '../../homepage.model';
import { HomepageService } from '../../services/homepage.service';
import { AuthService } from "../../../../core/authentication.service";
import { Router } from "@angular/router";
import { ContentDetailsService } from 'src/app/shared/services/content-details.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscussionPostDetailsComponent } from 'src/app/shared/components/discussion-post-details/discussion-post-details.component';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
})
export class DiscussionListComponent implements OnInit {

  discussionList!: Observable<DiscussionPost[]>;

  constructor(
    private homepageService: HomepageService,
    private contentDetailsService: ContentDetailsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userID = this.authService.getLoggedInUser();
    this.discussionList = this.homepageService.getDiscussionList(userID);

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser();
      this.discussionList = this.homepageService.getDiscussionList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.discussionList = this.homepageService.getDiscussionList();
    });
  }

  navigateToTopicForum(topic: DiscussionPostTopic) {
    switch (topic.type) {
      case 'ARTIST': {
        this.router.navigate(['/artist'], { queryParams: { id: topic.id } }).catch(noop);
        break;
      }
      case 'GROUP': {
        this.router.navigate(['/group'], { queryParams: { id: topic.id } }).catch(noop);
        break;
      }
      default: {
        this.router.navigate(['/']).catch(noop);
        break;
      }
    }
  }

  navigateToAuthorProfile(author: string) {
    this.router.navigate(['/user'], { queryParams: { id: author } }).catch(noop);
  }

  navigateToArtistProfile(artist: string) {
    this.router.navigate(['/artist'], { queryParams: { id: artist } }).catch(noop);
  }

  openPostModal(post: DiscussionPost) {
    console.log(`Open post modal/details at: /forum/${post.topic.name}/${post.id}`);

    this.contentDetailsService.getDiscussionPostDetails(post.id).subscribe({
      next: (discussionPost) => {
        this.dialog.open(DiscussionPostDetailsComponent, { data: discussionPost });
      },
      error: () => {
        this.router.navigate(['/']).catch(noop);
      }
    });

  }

  openPostDetails(postID: string) {
    this.router.navigate(['/discussion'], { queryParams: { id: postID } }).catch(noop);
  }
}
