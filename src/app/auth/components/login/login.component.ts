import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const loginRequest: LoginRequest = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.isSubmitting = true;
    this.loginService.login(loginRequest).subscribe(
      response => {
        this.isSubmitting = false;

        this.message = 'Login successful';
        this.hasError = false;

        setTimeout(() => {
          this.message = '';
          this.router.navigate(['/']);
        }, 3000);
      },
      error => {
        this.isSubmitting = false;

        this.message = 'Incorrect username or password';
        this.hasError = true;

        setTimeout(() => {
          this.message = '';
          this.hasError = false;
        }, 3000);
      }
    );
  }
}
