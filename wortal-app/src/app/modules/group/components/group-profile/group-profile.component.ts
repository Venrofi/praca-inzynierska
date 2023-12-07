import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, catchError, debounceTime, of, switchMap } from "rxjs";
import { StoreModel } from "../../../../app-state.model";
import { Group, Member } from "../../../../core/core.model";
import * as memberActions from "../../../../store/member/member.actions";
import { GroupService } from "../../services/group.service";
import { MatDialog } from '@angular/material/dialog';
import { EditGroupProfileDialogComponent } from '../edit-group-profile-dialog/edit-group-profile-dialog.component';
import { EditGroupRequest, EditGroupResponse } from 'src/app/core/api.model';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
})
export class GroupProfileComponent implements OnInit {
  group!: Group;

  groupMember: boolean = false;

  groupOwner: boolean = false;

  member!: Member;

  private clickSubject = new Subject<void>();

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.select(state => state.app.member).subscribe(member => {
      if (member) {
        this.member = member;
      }
      if (member && this.group) {
        this.group.members.find(member => member.id === this.member.id) ? this.groupMember = true : this.groupMember = false;
      }
      if (member && this.group?.owner) {
        this.group.owner.id === this.member.id ? this.groupOwner = true : this.groupOwner = false;
      }
    });

    this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.groupService.getGroupInformation(params['id']);
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wczytywania profilu grupy.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as Group);
        })
      )
      .subscribe(group => {
        this.group = group;
        this.group.members.find(member => member.id === this.member?.id) ? this.groupMember = true : this.groupMember = false;

        if (this.group.owner) {
          this.group.owner.id === this.member?.id ? this.groupOwner = true : this.groupOwner = false;
        }
      });

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => {
      if (this.groupOwner) {
        this.openEditGroupDialog();
        return;
      }
      this.groupMember ? this.unjoinGroup() : this.joinGroup();
    });
  }

  joinGroup() {
    this.groupService.joinGroup(this.group.id).subscribe({
      next: () => {
        if (this.member) {
          this.groupMember = true;

          // Update local state
          this.group.members = [...this.group.members, { id: this.member.id, name: this.member.name }];

          // Update global store state
          const joinedGroups = [...this.member.joinedGroups, { id: this.group.id, name: this.group.name }];
          this.store.dispatch(memberActions.update({ member: { ...this.member, joinedGroups } }));

          this.snackBar.open('Dołączyłeś do tej Grupy.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        }
      },
      error: () => {
        this.snackBar.open('Wystąpił błąd podczas próby dołączenia do tej Grupy!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  unjoinGroup() {
    this.groupService.unjoinGroup(this.group.id).subscribe({
      next: () => {
        if (this.member) {
          this.groupMember = false;

          // Update local state
          this.group.members = this.group.members.filter(member => member.id !== this.member?.id);

          // Update global store state
          const joinedGroups = this.member.joinedGroups.filter(group => group.id !== this.group.id);
          this.store.dispatch(memberActions.update({ member: { ...this.member, joinedGroups } }));

          this.snackBar.open('Opuściłeś tą Grupę.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        }
      },
      error: () => {
        this.snackBar.open('Wystąpił błąd podczas próby opuszczenia tej Grupy!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  openEditGroupDialog() {
    const editData: EditGroupRequest = {
      userId: this.member.id,
      groupId: this.group.id,
      data: {
        name: this.group.name,
        description: this.group.description,
        image: this.group.image,
      }
    }
    this.dialog.open(EditGroupProfileDialogComponent, { width: '90vw', maxWidth: '500px', data: editData })
      .afterClosed().subscribe((response: EditGroupResponse) => {
        if (response?.code === 'success') {
          this.group.name = response.data.name;
          this.group.description = response.data.description;
          this.group.image = response.data.image;
        }
      });
  }

  groupAction() {
    this.clickSubject.next();
  }
}
