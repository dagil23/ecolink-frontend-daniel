import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { EcoMatchRoutingModule } from './eco-match-routing.module';
import { MatchListComponent } from './pages/match-list/match-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { MatchFilterComponent } from './components/match-filter/match-filter.component';



@NgModule({
  declarations: [
    MatchListComponent,
    MatchCardComponent,
    MatchFilterComponent
  ],
  imports: [
    CommonModule,
    EcoMatchRoutingModule,
    SharedModule,
    FormsModule // Añadir FormsModule a la lista de imports
  ]
})


export class EcoMatchModule { }
