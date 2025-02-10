import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupsRoutingModule } from './startups-routing.module';
import { StartupCardComponent } from './components/startup-card/startup-card.component';
import { StartupFiltersComponent } from './components/startup-filters/startup-filters.component';
import { StartupsListComponent } from './pages/startups-list/startups-list.component';
import { StartupDetailComponent } from './pages/startup-detail/startup-detail.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    StartupCardComponent,
    StartupFiltersComponent,
    StartupsListComponent,
    StartupDetailComponent
  ],
  imports: [
    CommonModule,
    StartupsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class StartupsModule { }
