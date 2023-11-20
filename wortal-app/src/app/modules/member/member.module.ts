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

@NgModule({
  declarations: [MemberComponent, MembersListComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedMaterialModule,
  ],
  exports: [MemberComponent]
})
export class MemberModule { }
