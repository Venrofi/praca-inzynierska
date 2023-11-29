import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/authentication.guard';
import { AccountVerificationComponent } from './modules/authentication/components/account-verification/account-verification.component';
import { ResetPasswordComponent } from './modules/authentication/components/reset-password/reset-password.component';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { DiscussionPostDetailsComponent } from "./shared/components/discussion-post-details/discussion-post-details.component";
import { EventDetailsComponent } from './shared/components/event-details/event-details.component';
import { SearchResultsComponent } from './shared/components/search-results/search-results.component';
import { UserProfileComponent } from "./shared/components/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule) },
  { path: 'group', canActivate: [AuthGuard], loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule) },
  { path: 'artist', loadChildren: () => import('./modules/artist/artist.module').then(m => m.ArtistModule) },
  { path: 'user', component: UserProfileComponent },
  { path: 'new-password', component: ResetPasswordComponent },
  { path: 'verify-account', component: AccountVerificationComponent },
  { path: 'discussion', component: DiscussionPostDetailsComponent },
  { path: 'event', component: EventDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
