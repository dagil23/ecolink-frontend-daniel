import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaypalPendingComponent } from './components/paypal-pending/paypal-pending.component';
import { PaypalCancelComponent } from './components/paypal-cancel/paypal-cancel.component';

const routes: Routes = [
  {
    path: '',
    component: CartListComponent
  },
  {
    path: 'payment-info',
    component: PaymentInfoComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'paypal-pending',
    component: PaypalPendingComponent
  },
  {
    path: 'paypal-cancel',
    component: PaypalCancelComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
