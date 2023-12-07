import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/material.module';
import { SharedModule } from "../../shared/shared.module";
import { CreateDiscussionPostDialogComponent } from './components/create-discussion-post-dialog/create-discussion-post-dialog.component';
import { CreateNewGroupDialogComponent } from './components/create-new-group-dialog/create-new-group-dialog.component';
import { EditDiscussionPostDialogComponent } from './components/edit-discussion-post-dialog/edit-discussion-post-dialog.component';
import { EditGroupProfileDialogComponent } from './components/edit-group-profile-dialog/edit-group-profile-dialog.component';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupRoutingModule } from './group-routing.module';
import { DiscussionPostActionService } from './services/discussion-post-action.service';
import { GroupService } from "./services/group.service";

@NgModule({
  declarations: [
    GroupProfileComponent,
    GroupsListComponent,
    CreateNewGroupDialogComponent,
    EditGroupProfileDialogComponent,
    CreateDiscussionPostDialogComponent,
    EditDiscussionPostDialogComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedMaterialModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    GroupService,
    DiscussionPostActionService,
  ],
})
export class GroupModule { }
