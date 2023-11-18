import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';


const routes: Routes = [
  {
    path: '',
    component: GroupProfileComponent
  },
  {
    path: 'list',
    component: GroupsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
