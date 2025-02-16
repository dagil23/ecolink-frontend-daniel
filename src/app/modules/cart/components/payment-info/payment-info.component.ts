import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.scss'
})
export class PaymentInfoComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/), this.luhnValidator]],
      cardHolder: ['', Validators.required],
      cardExpiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cardCVC: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardType: ['', Validators.required],
      cardCountry: ['', Validators.required],
      cardZipCode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment submitted', this.paymentForm.value);
      alert('Payment successful!');
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  private luhnValidator(control: any) { // 5105 1051 0510 5100 // 3714 4963 5398 431
    const value = control.value;
    if (!value) return null;

    let sum = 0;
    let alternate = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let n = parseInt(value[i], 10);
      if (alternate) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alternate = !alternate;
    }
    return sum % 10 === 0 ? null : { invalidCardNumber: true };
  }
}
