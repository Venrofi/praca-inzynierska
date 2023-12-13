import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/app-state.model';
import { UpdateMemberRequest } from 'src/app/core/api.model';
import { Member } from 'src/app/core/core.model';
import * as memberActions from "../../../../store/member/member.actions";
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
})
export class EditMemberDialogComponent {

  editMemberModel!: UpdateMemberRequest;

  isProcessing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public memberData: Member,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<EditMemberDialogComponent>,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
  ) {
    this.editMemberModel = {
      memberId: this.memberData.id,
      data: {
        bio: this.memberData.bio,
      }
    }
  }

  edit() {
    this.isProcessing = true;

    this.memberService.updateMember(this.editMemberModel).subscribe({
      next: (response: Member) => {
        this.isProcessing = false;
        this.store.dispatch(memberActions.update({ member: { ...response } }));
        this.snackBar.open('Pomyślnie zapisano zmiany na profilu.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close();
      },
      error: (error) => {
        this.isProcessing = false;
        this.snackBar.open('Wystąpił błąd podczas próby edycji profilu.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    })
  }

}
