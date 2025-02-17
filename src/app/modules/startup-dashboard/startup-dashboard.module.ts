import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupDashboardRoutingModule } from './startup-dashboard-routing.module';
import { StartupProductsComponent } from './pages/startup-products/startup-products.component';
import { StartupProductFormComponent } from './pages/startup-product-form/startup-product-form.component';
import { StartupProductFiltersComponent } from './components/startup-product-filters/startup-product-filters.component';
import { SharedModule } from "../../shared/shared.module";
import { StartupPostsComponent } from './components/startup-posts/startup-posts.component';
import { StartupFormPostComponent } from './components/startup-form-post/startup-form-post.component';


@NgModule({
  declarations: [
    StartupProductsComponent,
    StartupProductFormComponent,
    StartupProductFiltersComponent,
    StartupPostsComponent,
    StartupFormPostComponent
  ],
  imports: [
    CommonModule,
    StartupDashboardRoutingModule,
    SharedModule
]
})
export class StartupDashboardModule { }
