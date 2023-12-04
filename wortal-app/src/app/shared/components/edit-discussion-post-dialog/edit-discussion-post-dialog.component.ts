import { Component, Inject } from '@angular/core';
import { EditDiscussionPostRequest } from 'src/app/core/api.model';
import { DiscussionPostActionService } from '../../services/discussion-post-action.service';
import { DiscussionPostDetails } from 'src/app/modules/homepage/homepage.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-discussion-post-dialog',
  templateUrl: './edit-discussion-post-dialog.component.html',
})
export class EditDiscussionPostDialogComponent {

  editDiscussionPostModel!: EditDiscussionPostRequest;

  isProcessing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public discussionData: DiscussionPostDetails,
    private discussionPostActionService: DiscussionPostActionService,
    private dialogRef: MatDialogRef<EditDiscussionPostDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.editDiscussionPostModel = {
      postId: this.discussionData.id,
      userId: this.discussionData.author.id,
      data: {
        title: this.discussionData.title,
        content: this.discussionData.content,
      }
    }
  }

  edit() {
    this.isProcessing = true;

    this.discussionPostActionService.editDiscussionPost(this.editDiscussionPostModel).subscribe({
      next: (response) => {
        this.isProcessing = false;
        console.log(response);
        this.snackBar.open('Pomyślnie zapisano zmiany dla dyskusji.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close();
        this.router.navigate(['/discussion'], { queryParams: { id: this.discussionData.id } });
      },
      error: (error) => {
        this.isProcessing = false;
        this.snackBar.open('Wystąpił błąd podczas próby edycji dyskusji.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
        console.log(error);
      }
    });
  }

}
