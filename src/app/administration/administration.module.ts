import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { StartupVerificationComponent } from './components/startup-verification/startup-verification.component';
import { ChallengeCrudComponent } from './components/challenge-crud/challenge-crud.component';
import { MissionCrudComponent } from './components/mission-crud/mission-crud.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductCrudComponent,
    StartupVerificationComponent,
    ChallengeCrudComponent,
    MissionCrudComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
