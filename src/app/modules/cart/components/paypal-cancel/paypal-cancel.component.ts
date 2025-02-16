import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal-cancel',
  template: '',
})
export class PaypalCancelComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cancelPayment().subscribe(
      () => {
        this.router.navigate(['/']);
      },
      error => {
        this.router.navigate(['/']);
      }
    );
  }
}
