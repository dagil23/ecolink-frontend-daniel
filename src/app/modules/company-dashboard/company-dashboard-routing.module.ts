import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyChallengesComponent } from './pages/company-challenges/company-challenges.component';
import { CompanyChallengeFormComponent } from './pages/company-challenge-form/company-challenge-form.component';
import { CompanyProposalsComponent } from './pages/company-proposals/company-proposals.component';

const routes: Routes = [
  {
    path: 'challenges',
    component: CompanyChallengesComponent,
  },
  {
    path: 'challenges/new',
    component: CompanyChallengeFormComponent,
  },
  {
    path: 'challenges/edit/:id',
    component: CompanyChallengeFormComponent,
  },
  {
    path: 'challenges/proposal/:id',
    component: CompanyProposalsComponent,
  },
  {
    path: '**',
    redirectTo: 'challenges',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDashboardRoutingModule {}
