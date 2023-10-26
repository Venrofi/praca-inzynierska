import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { AuthGuard } from './core/authentication.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'member', canActivate: [AuthGuard], loadChildren: () => import('./modules/member/member.module').then(m => m.MemberModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
