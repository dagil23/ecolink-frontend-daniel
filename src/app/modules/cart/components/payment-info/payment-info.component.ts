import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.scss'
})
export class PaymentInfoComponent {
  paymentForm: FormGroup;
  isLoading: boolean = false;
  isCanceled: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private cartService: CartService, private route: Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolder: ['', Validators.required],
      cardExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cardCVC: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardType: ['', Validators.required],
      cardCountry: ['', Validators.required],
      cardZipCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.paymentForm.valid) {
      this.paymentForm.markAllAsTouched();
      return ;
    }

    this.isLoading = true;

    const body = {
      cardNumber: this.paymentForm.get('cardNumber')?.value || '',
      cardHolder: this.paymentForm.get('cardHolder')?.value || '',
      cardExpiration: this.paymentForm.get('cardExpiration')?.value || '',
      cardCVC: this.paymentForm.get('cardCVC')?.value || '',
      cardType: this.paymentForm.get('cardType')?.value || '',
      cardCountry: this.paymentForm.get('cardCountry')?.value || '',
      cardZipCode: this.paymentForm.get('cardZipCode')?.value || ''
    };

    this.cartService.payWithCard(body).subscribe((data) => {
      this.isLoading = false;
      this.message = 'Payment successful! Redirecting to the home page...';

      setTimeout(() => {
        this.message = '';
        window.location.href = '/';
      }, 3000);
    });
  }

  payWithPaypal() {
    this.cartService.payWithPaypal().subscribe((data) => {
      console.log('Paypal payment', data);
      window.location.href = data.message;
    })
  }

  cancelOrder(): void {
    this.isCanceled = true;
    this.cartService.cancelOrder().subscribe(() => {
      this.route.navigate(['/']);
    });
  }
}
