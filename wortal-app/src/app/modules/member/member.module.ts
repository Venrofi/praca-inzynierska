import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberComponent } from './components/member/member.component';
import { MemberRoutingModule } from './member-routing.module';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [MemberComponent]
})
export class MemberModule { }
