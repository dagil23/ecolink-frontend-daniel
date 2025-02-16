import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isSubmitting = false;
  isLoading: boolean = false;
  message: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      email: [{ value: '', disabled: true }, Validators.required],
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('resetEmail') || ''; // Recuperar email de localStorage
    const codeFromUrl = this.route.snapshot.queryParamMap.get('code') || ''; // Obtener código desde la URL

    this.resetPasswordForm.patchValue({ email: storedEmail, code: codeFromUrl });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid ||
      this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.confirmPassword) {
      this.message = 'Passwords do not match';
      this.success = false;
      return;
    }

    this.isLoading = true;
    this.isSubmitting = true;
    this.authService.changePassword({
      email: this.resetPasswordForm.getRawValue().email,
      code: this.resetPasswordForm.value.code,
      newPassword: this.resetPasswordForm.value.newPassword
    }).subscribe(
      () => {
        this.success = true;
        this.isLoading = false;
        this.message = 'Password changed successfully!';
        localStorage.removeItem('resetEmail'); // Eliminar email guardado tras cambiar la contraseña
        setTimeout(() => this.router.navigate(['/auth/login']), 3000);
      },
      error => {
        this.success = false;
        this.message = 'Invalid code or error updating password.';
        this.isSubmitting = false;
      }
    );
  }
}
