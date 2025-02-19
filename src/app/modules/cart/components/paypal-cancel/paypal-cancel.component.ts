import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-paypal-cancel',
  template: '',
})
export class PaypalCancelComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cancelPayment().subscribe(
      () => {
        window.location.href = '/';
      },
      error => {
        window.location.href = '/';
      }
    );
  }
}
