import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {VerificationService} from '../../services/VerificationService.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  email: string = '';
  showSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail') || '';
    this.verificationForm.patchValue({ email: this.email });
  }

  verifyCode(): void {
    if (this.verificationForm.invalid) {
      this.verificationForm.controls['code'].markAsTouched();
      return;
    }

    this.showSuccess = false; // Resetear estado anterior
    const { email, code } = this.verificationForm.getRawValue();

    this.verificationService.verifyCode(email, code).subscribe(
      response => {
        this.showSuccess = true; // Mostrar mensaje de éxito
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000); // Redirigir después de 2 segundos
      },
      error => {
        console.error('Error en la verificación', error);
        this.verificationForm.controls['code'].setErrors({ invalidCode: true });
      }
    );
  }
}
