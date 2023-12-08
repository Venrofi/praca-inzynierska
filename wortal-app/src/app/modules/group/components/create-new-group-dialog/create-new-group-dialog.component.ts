import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/app-state.model';
import { CreateNewGroupRequest } from 'src/app/core/api.model';
import { Member } from 'src/app/core/core.model';
import * as memberActions from '../../../../store/member/member.actions';
import { GroupService } from '../../services/group.service';


@Component({
  selector: 'app-create-new-group-dialog',
  templateUrl: './create-new-group-dialog.component.html',
})
export class CreateNewGroupDialogComponent implements OnInit {

  member!: Member;

  newGroup!: CreateNewGroupRequest;

  isProcessing: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateNewGroupDialogComponent>,
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
  ) { }

  ngOnInit() {
    this.store.select(state => state.app.member)
      .subscribe(member => {
        if (member) {
          this.member = member;

          this.newGroup = {
            userId: member.id,
            name: '',
            description: '',
            image: this.groupService.generateDefaultGroupImage(),
          }
        }
      });
  }

  create() {
    this.isProcessing = true;

    this.groupService.createNewGroup(this.newGroup).subscribe({
      next: (response) => {
        this.isProcessing = false;

        if (response.newGroup) {
          this.groupService.joinGroup(response.newGroup.id);
          const joinedGroups = [...this.member.joinedGroups, response.newGroup];
          this.store.dispatch(memberActions.update({ member: { ...this.member, joinedGroups } }));
        }

        this.snackBar.open('Stworzyłeś nową grupę!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close();
      },
      error: (error) => {
        this.isProcessing = false;

        this.snackBar.open('Nie udało się dodać nowej grupy.', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    })
  }
}
