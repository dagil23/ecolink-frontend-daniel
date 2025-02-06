import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { ChallenguesCrudComponent } from './components/challengues-crud/challengues-crud.component';
import { StartupVerificationComponent } from './components/startup-verification/startup-verification.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductCrudComponent,
    ChallenguesCrudComponent,
    StartupVerificationComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
