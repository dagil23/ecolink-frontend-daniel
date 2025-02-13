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
    if (this.verificationForm.valid) {
      const { email, code } = this.verificationForm.getRawValue();
      this.verificationService.verifyCode(email, code).subscribe(
        response => {
          console.log('Código verificado con éxito', response);
          this.router.navigate(['/auth/login']).then(() => {});
        },
        error => {
          console.error('Error en la verificación', error);
        }
      );
    }
  }

}
