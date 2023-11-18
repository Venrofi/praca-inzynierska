import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';


const routes: Routes = [
  {
    path: '',
    component: GroupProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
