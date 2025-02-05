import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeComponent } from './challenge/challenge.component';
import { SharedModule } from "../shared/shared.module";


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    ChallengeComponent
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
