import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyChallengesComponent } from './pages/company-challenges/company-challenges.component';
import { CompanyChallengeFormComponent } from './pages/company-challenge-form/company-challenge-form.component';
import { CompanyProposalsComponent } from './pages/company-proposals/company-proposals.component';
import { CompanyGuard } from '../../core/guards/company.guard';

const routes: Routes = [
  {
    path: 'challenges',
    component: CompanyChallengesComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'challenges/new',
    component: CompanyChallengeFormComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'challenges/edit/:id',
    component: CompanyChallengeFormComponent,
    canActivate: [CompanyGuard],
  },
  {
    path: 'challenges/proposal/:id',
    component: CompanyProposalsComponent,
    canActivate: [CompanyGuard],
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
