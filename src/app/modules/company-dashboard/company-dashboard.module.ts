import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDashboardRoutingModule } from './company-dashboard-routing.module';
import { CompanyChallengesComponent } from './pages/company-challenges/company-challenges.component';
import { CompanyChallengeFormComponent } from './pages/company-challenge-form/company-challenge-form.component';
import { CompanyChallengeFiltersComponent } from './components/company-challenge-filters/company-challenge-filters.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CompanyProposalsComponent } from './pages/company-proposals/company-proposals.component';

@NgModule({
  declarations: [
    CompanyChallengesComponent,
    CompanyChallengeFormComponent,
    CompanyChallengeFiltersComponent,
    CompanyProposalsComponent
  ],
  imports: [
    CommonModule,
    CompanyDashboardRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CompanyDashboardModule { }
