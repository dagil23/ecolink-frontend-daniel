import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesListComponent } from './pages/challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './pages/challenge-detail/challenge-detail.component';
import { ChallengeFormComponent } from './pages/challenge-form/challenge-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesListComponent
  },
  {
    path: ':id',
    component: ChallengeDetailComponent
  },
  {
    path: 'form/:id',
    component: ChallengeFormComponent
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
