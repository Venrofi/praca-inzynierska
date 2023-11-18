import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberComponent } from './components/member/member.component';
import { MembersListComponent } from './components/members-list/members-list.component';


const routes: Routes = [
  {
    path: '',
    component: MemberComponent
  },
  {
    path: 'list',
    component: MembersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
