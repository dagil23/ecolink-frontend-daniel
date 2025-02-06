import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ChallengesListComponent } from './challenges-list/challenges-list.component';
import { ChallengeDetailComponent } from './challenge-detail/challenge-detail.component';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    ChallengesListComponent,
    ChallengesListComponent,
    ChallengeDetailComponent
  ],
  imports: [
    CommonModule,
    ChallengesRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
})
export class ChallengesModule { }
