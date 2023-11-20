import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from 'src/app/material.module';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupRoutingModule } from './group-routing.module';



@NgModule({
  declarations: [
    GroupProfileComponent,
    GroupsListComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedMaterialModule,
  ]
})
export class GroupModule { }
