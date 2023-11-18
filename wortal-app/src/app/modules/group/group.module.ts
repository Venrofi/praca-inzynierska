import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GroupProfileComponent } from './components/group-profile/group-profile.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupsListComponent } from './components/groups-list/groups-list.component';



@NgModule({
  declarations: [
    GroupProfileComponent,
    GroupsListComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,

    // Angular Material
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ]
})
export class GroupModule { }
