import { Component, HostListener, Inject, OnInit, Optional, ViewChild } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditDiscussionPostDialogComponent } from '../edit-discussion-post-dialog/edit-discussion-post-dialog.component';
import { EditDiscussionPostResponse } from 'src/app/core/api.model';

@Component({
  selector: 'app-discussion-post-details',
  templateUrl: './discussion-post-details.component.html',
})
export class DiscussionPostDetailsComponent implements OnInit {
  discussionPost!: DiscussionPostDetails;

  formattedContent: string[] = [];

  member: Member | undefined;

  newComment: string = '';

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  private clickSubject = new Subject<void>();

  @ViewChild('commentForm') commentForm!: NgForm;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public discussionPostData: DiscussionPostDetails,
    private contentDetailsService: ContentDetailsService,
    private discussionPostActionService: DiscussionPostActionService,
    private store: Store<StoreModel>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => this.addComment());

    if (this.discussionPostData) {
      this.discussionPost = this.discussionPostData;
      return;
    }

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
        this.formattedContent = this.discussionPost.content.split('\n').filter(line => line !== '');
      });
  }

  editDiscussionPost() {
    this.dialog.open(EditDiscussionPostDialogComponent, { width: '90vw', maxWidth: '500px', data: this.discussionPost })
      .afterClosed().subscribe((response: EditDiscussionPostResponse) => {
        if (response?.code === 'success') {
          this.discussionPost.title = response.data.title;
          this.discussionPost.content = response.data.content;
          this.formattedContent = this.discussionPost.content.split('\n').filter(line => line !== '');
        }
      });
  }

  deleteDiscussionPost() {
    console.log('delete');
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
