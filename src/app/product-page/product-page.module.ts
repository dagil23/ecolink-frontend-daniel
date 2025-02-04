import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from "../shared/shared.module";
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    ProductsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductPageModule { }
