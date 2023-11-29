import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, debounceTime, switchMap } from "rxjs";
import { StoreModel } from "../../../../app-state.model";
import { Group, Member } from "../../../../core/core.model";
import * as memberActions from "../../../../store/member/member.actions";
import { GroupService } from "../../services/group.service";

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
})
export class GroupProfileComponent implements OnInit {
  group!: Group;

  groupMember: boolean = false;

  member: Member | undefined;

  private clickSubject = new Subject<void>();

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<StoreModel>,
  ) { }

  ngOnInit() {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.route.queryParams.pipe(
      switchMap(params => {
        return this.groupService.getGroupInformation(params['id']);
      })
    ).subscribe(group => {
      this.group = group;
      this.group.members.find(member => member.id === this.member?.id) ? this.groupMember = true : this.groupMember = false;
    });

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => {
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

  groupAction() {
    this.clickSubject.next();
  }
}
