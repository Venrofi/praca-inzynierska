import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicResponse, EditGroupRequest } from 'src/app/core/api.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-edit-group-profile-dialog',
  templateUrl: './edit-group-profile-dialog.component.html',
})
export class EditGroupProfileDialogComponent {

  editGroupModel: EditGroupRequest;

  isProcessing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public groupData: EditGroupRequest,
    private dialogRef: MatDialogRef<EditGroupProfileDialogComponent>,
    private groupService: GroupService,
    private snackBar: MatSnackBar,
  ) {
    this.editGroupModel = groupData;
  }

  edit() {
    this.isProcessing = true;

    this.groupService.editGroup(this.editGroupModel).subscribe({
      next: (response: BasicResponse) => {
        this.isProcessing = false;

        this.snackBar.open('Pomyślnie edytowałeś grupę!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close({ code: response.code, data: this.editGroupModel.data });
      },
      error: (error) => {
        this.isProcessing = false;

        this.snackBar.open('Edycja grupy nie powiodła się.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    })
  }
}
