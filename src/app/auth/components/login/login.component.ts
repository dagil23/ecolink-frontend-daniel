import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../services/LoginService.service';
import { LoginRequest } from '../../models/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
        alert('Login successful');
        console.log(response);
        
      },
      error => {
        this.isSubmitting = false;
        alert('Login failed');
      }
    );
  }
}
