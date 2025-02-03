import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    SharedModule
]
})
export class ProductPageModule { }
