import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { AuthGuard } from './core/authentication.guard';
import { UserProfileComponent } from "./shared/components/user-profile/user-profile.component";
import { GroupProfileComponent } from "./shared/components/group-profile/group-profile.component";
import { ArtistProfileComponent } from "./shared/components/artist-profile/artist-profile.component";
import {
  DiscussionPostDetailsComponent
} from "./shared/components/discussion-post-details/discussion-post-details.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule) },
  { path: 'user', component: UserProfileComponent },
  { path: 'discussion', component: DiscussionPostDetailsComponent },
  { path: 'artist', component: ArtistProfileComponent },
  { path: 'group', component: GroupProfileComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const API_ROOT = 'https://localhost:7145/api';
