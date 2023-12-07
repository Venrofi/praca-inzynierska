import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { StoreModel } from "../../../../app-state.model";
import { CreateDiscussionPostRequest } from "../../../../core/api.model";
import { BaseWortalElement } from "../../../../core/core.model";
import { DiscussionPostActionService } from "../../services/discussion-post-action.service";

@Component({
  selector: 'app-create-discussion-post-dialog',
  templateUrl: './create-discussion-post-dialog.component.html'
})
export class CreateDiscussionPostDialogComponent implements OnInit {

  newPost!: CreateDiscussionPostRequest;

  isProcessing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public availableGroups: BaseWortalElement[],
    private dialogRef: MatDialogRef<CreateDiscussionPostDialogComponent>,
    private discussionPostActionService: DiscussionPostActionService,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
  ) { }

  ngOnInit() {
    this.store.select(state => state.app.member)
      .subscribe(member => {
        if (member) {
          this.newPost = {
            authorId: member.id,
            groupId: '',
            title: '',
            content: '',
          }
        }
      });
  }

  create() {
    this.isProcessing = true;

    this.discussionPostActionService.createNewDiscussion(this.newPost).subscribe({
      next: (response) => {
        this.isProcessing = false;

        this.snackBar.open('Stworzyłeś nowy post!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close();
      },
      error: (error) => {
        this.isProcessing = false;

        this.snackBar.open('Nie udało się dodać nowego postu.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    })
  }
}
