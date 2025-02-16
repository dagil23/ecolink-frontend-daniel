import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-paypal-pending',
  template: ``,
})
export class PaypalPendingComponent implements OnInit {
  paymentId: string = '';
  token: string = '';

  constructor(private route: ActivatedRoute, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'];
      this.token = params['PayerID'];
    });

    this.cartService.confirmPayment(this.paymentId, this.token).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.router.navigate(['/']);
      }
    );
  }
}
