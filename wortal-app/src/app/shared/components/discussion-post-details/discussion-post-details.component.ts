import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { DiscussionPostDetails } from 'src/app/modules/homepage/homepage.model';
import { ContentDetailsService } from '../../services/content-details.service';
import { StoreModel } from 'src/app/app-state.model';
import { Store } from '@ngrx/store';
import { Member } from 'src/app/core/core.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { DiscussionPostActionService } from "../../services/discussion-post-action.service";

@Component({
  selector: 'app-discussion-post-details',
  templateUrl: './discussion-post-details.component.html',
})
export class DiscussionPostDetailsComponent implements OnInit {
  discussionPost!: DiscussionPostDetails;

  member: Member | undefined;

  newComment: string = '';

  private clickSubject = new Subject<void>();

  @ViewChild('commentForm') commentForm!: NgForm;

  constructor(
    private contentDetailsService: ContentDetailsService,
    private discussionPostActionService: DiscussionPostActionService,
    private store: Store<StoreModel>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.contentDetailsService.getDiscussionPostDetails(params['id'])
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wczytywania szczegółów dyskusji.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as DiscussionPostDetails);
        })
      )
      .subscribe(discussionPost => {
        this.discussionPost = discussionPost;
      });

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => this.addComment());
  }

  commentAction() {
    this.clickSubject.next();
  }

  addComment() {
    this.discussionPostActionService.addComment(this.discussionPost.id, this.newComment)
      .subscribe({
        next: (response) => {
          this.discussionPost.comments.push(response.createdComment);

          this.newComment = '';
          this.commentForm.resetForm();

          this.snackBar.open('Dodałeś komentarz!', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        },
        error: () => {
          this.snackBar.open('Wystąpił błąd podczas próby dodania nowego komentarza!', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });
        }
      });
  }
}
