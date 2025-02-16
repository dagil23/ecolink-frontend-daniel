import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  total: number = 0;
  checkoutForm: FormGroup;
  message: string = '';

  constructor(private cartService: CartService, private fb: FormBuilder, private router: Router) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      shippingPhone: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingCountry: ['', Validators.required],
      shippingZipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.total = cart.total;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Checkout Data:', this.checkoutForm.value.firstName);
    } else {
      this.checkoutForm.markAllAsTouched(); // Muestra errores si los hay
    }
    const { firstName, lastName, shippingPhone, shippingAddress, shippingCity, shippingCountry, shippingZipCode } = this.checkoutForm.value;
    const body = {
      firstName,
      lastName,
      shippingPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      shippingZipCode
    }

    this.cartService.checkout(body).subscribe(response => {
      this.message = 'Order placed successfully';
      setTimeout(() => {
        this.message = '';
        this.router.navigate(['/cart/payment-info']);
      }, 3000);
    })
  }
}
