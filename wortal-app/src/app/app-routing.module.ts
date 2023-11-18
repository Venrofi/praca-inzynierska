import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { AuthGuard } from './core/authentication.guard';
import { UserProfileComponent } from "./shared/components/user-profile/user-profile.component";
import { DiscussionPostDetailsComponent } from "./shared/components/discussion-post-details/discussion-post-details.component";
import { ResetPasswordComponent } from './modules/authentication/components/reset-password/reset-password.component';
import { AccountVerificationComponent } from './modules/authentication/components/account-verification/account-verification.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule) },
  { path: 'artist', loadChildren: () => import('./modules/artist/artist.module').then(m => m.ArtistModule) },
  { path: 'group', loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule) },
  { path: 'user', component: UserProfileComponent },
  { path: 'new-password', component: ResetPasswordComponent },
  { path: 'verify-account', component: AccountVerificationComponent },
  { path: 'discussion', component: DiscussionPostDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
