import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { DiscussionPostDetails } from 'src/app/modules/homepage/homepage.model';
import { ContentDetailsService } from '../../services/content-details.service';
import { StoreModel } from 'src/app/app-state.model';
import { Store } from '@ngrx/store';
import { Member } from 'src/app/core/core.model';

@Component({
  selector: 'app-discussion-post-details',
  templateUrl: './discussion-post-details.component.html',
})
export class DiscussionPostDetailsComponent implements OnInit {
  discussionPost!: DiscussionPostDetails;

  member: Member | undefined;

  private clickSubject = new Subject<void>();

  constructor(
    private contentDetailsService: ContentDetailsService,
    private store: Store<StoreModel>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.route.queryParams.pipe(
      switchMap(params => {
        return this.contentDetailsService.getDiscussionPostDetails(params['id'])
      })
    ).subscribe(discussionPost => {
      this.discussionPost = discussionPost;
      console.log(this.discussionPost);
    });

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => this.addComment());
  }

  commentAction() {
    this.clickSubject.next();
  }

  addComment() {
    console.log('Add comment');
  }

}
