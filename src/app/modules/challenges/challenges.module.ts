import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';
import { ChallengeFiltersComponent } from './components/challenge-filters/challenge-filters.component';
import { ChallengesListComponent } from './pages/challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './pages/challenge-detail/challenge-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ChallengeCardComponent,
    ChallengeFiltersComponent,
    ChallengesListComponent,
    ChallengeDetailComponent
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    SharedModule
  ]
})
export class ChallengesModule { }
