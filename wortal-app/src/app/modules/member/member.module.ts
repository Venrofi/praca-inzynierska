import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberComponent } from './components/member/member.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberService } from './services/member.service';
import { EditMemberDialogComponent } from './components/edit-member-dialog/edit-member-dialog.component';

@NgModule({
  declarations: [MemberComponent, MembersListComponent, EditMemberDialogComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedMaterialModule,
  ],
  exports: [MemberComponent],
  providers: [MemberService]
})
export class MemberModule { }
