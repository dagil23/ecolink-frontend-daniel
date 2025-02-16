import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupDashboardRoutingModule } from './startup-dashboard-routing.module';
import { StartupProductsComponent } from './pages/startup-products/startup-products.component';
import { StartupProductFormComponent } from './pages/startup-product-form/startup-product-form.component';
import { StartupProductFiltersComponent } from './components/startup-product-filters/startup-product-filters.component';
import { SharedModule } from "../../shared/shared.module";
import { StartupProposalsComponent } from './pages/startup-proposals/startup-proposals.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    StartupProductsComponent,
    StartupProductFormComponent,
    StartupProductFiltersComponent,
    StartupProposalsComponent
  ],
  imports: [
    CommonModule,
    StartupDashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule
  ]
})
export class StartupDashboardModule { }
