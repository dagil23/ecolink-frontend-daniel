import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartListComponent,
    PaymentInfoComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    ReactiveFormsModule
]
})
export class CartModule { }
