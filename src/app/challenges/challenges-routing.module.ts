import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ChallengeDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
