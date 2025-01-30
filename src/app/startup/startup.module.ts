import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { StartupViewComponent } from './components/startup-view/startup-view.component';
import { SharedModule } from "../shared/shared.module";
import { StartupDetailComponent } from './components/startup-detail/startup-detail.component';


@NgModule({
  declarations: [
    FilterComponent,
    StartupViewComponent,
    StartupDetailComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    SharedModule
]
})
export class StartupModule { }
