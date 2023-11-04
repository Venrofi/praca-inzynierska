import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { AuthGuard } from './core/authentication.guard';
import { UserProfileComponent } from "./shared/components/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule) },
  { path: 'user', component: UserProfileComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
