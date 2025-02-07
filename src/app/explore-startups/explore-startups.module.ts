import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreStartupsRoutingModule } from './explore-startups-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { StartupDetailComponent } from './components/startup-detail/startup-detail.component';
import { StartupViewComponent } from './components/startup-view/startup-view.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FilterComponent,
    StartupDetailComponent,
    StartupViewComponent
  ],
  imports: [
    CommonModule,
    ExploreStartupsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ExploreStartupsModule { }
