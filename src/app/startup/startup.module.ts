import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { StartupViewComponent } from './components/startup-view/startup-view.component';


@NgModule({
  declarations: [
    FilterComponent,
    StartupViewComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule
  ]
})
export class StartupModule { }
