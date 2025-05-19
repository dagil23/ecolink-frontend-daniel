import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LoginService} from '../../services/LoginService.service';
import { LoginRequest } from '../../models/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Alert message
  hasError: boolean = false;
  message: string = '';
  // Form
  loginForm!: FormGroup;
  isSubmitting = false;
  showPassword: boolean = false; // Estado inicial: contraseña oculta

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailOrUsernameValidator]],
      password: ['', [Validators.required,]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  private emailOrUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return { required: true };

    if (value.includes('@')) {
      return Validators.email(control);
    }

    return null;
  }


  onSubmit(): void {

    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      return;
    }

    const loginRequest: LoginRequest = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.isSubmitting = true;
    this.loginService.login(loginRequest).subscribe(
      response => {
        this.isSubmitting = true;
        this.hasError = false;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error => {
        this.isSubmitting = false;

        this.message = this.message = error.error.message;
        this.hasError = true;

        setTimeout(() => {
          this.message = '';
          this.hasError = false;
        }, 3000);
      }
    );
  }
}
