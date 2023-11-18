import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberComponent } from './components/member/member.component';
import { MemberRoutingModule } from './member-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MembersListComponent } from './components/members-list/members-list.component';

@NgModule({
  declarations: [MemberComponent, MembersListComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    // Angular Material
    MatProgressSpinnerModule,
  ],
  exports: [MemberComponent]
})
export class MemberModule { }
