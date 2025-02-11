import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { ChallengeFiltersComponent } from './components/challenge-filters/challenge-filters.component';
import { ChallengesListComponent } from './pages/challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './pages/challenge-detail/challenge-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { ChallengeFormComponent } from './pages/challenge-form/challenge-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChallengeCardComponent,
    ChallengeFiltersComponent,
    ChallengesListComponent,
    ChallengeDetailComponent,
    ChallengeFormComponent
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ChallengesModule { }
