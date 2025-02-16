import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  message: string = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.isSubmitting = true;
    const email = this.forgotPasswordForm.value.email;
    localStorage.setItem('resetEmail', email); // Guardar email en localStorage

    this.authService.resetPassword(email).subscribe(
      () => {
        this.success = true;
        this.message = 'A verification email has been sent if the email exists.';
        setTimeout(() => this.router.navigate(['/auth/reset-password']), 3000);
      },
      error => {
        this.success = false;
        this.message = 'Error sending verification email.';
        this.isSubmitting = false;
      }
    );
  }
}
