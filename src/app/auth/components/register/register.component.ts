import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preference } from '../../models/Preference';
import { RegistrationService } from '../../services/RegisterService.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userTypes: string[] = ['Client', 'Company', 'Startup'];
  preferences: Preference[] = [];
  imageUrl: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      description: [''],
      preference: [[]],
      imageUrl: [null,Validators.required],
    });

    this.registrationForm.get('userType')?.valueChanges.subscribe(value => {
      const descriptionControl = this.registrationForm.get('description');
      const preferenceControl = this.registrationForm.get('preference');

      if (value === 'Company' || value === 'Startup') {
        this.registrationService.getAllPreferences().subscribe((preferences: Preference[]) => {
          this.preferences = preferences;
        });

        descriptionControl?.setValidators([Validators.required, Validators.minLength(10)]);
        preferenceControl?.setValidators([Validators.required]);
      } else {
        descriptionControl?.clearValidators();
        preferenceControl?.clearValidators();
      }

      descriptionControl?.updateValueAndValidity();
      preferenceControl?.updateValueAndValidity();
    });
  }

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.registrationForm.get('imageUrl')?.setValue(null);
      this.imageUrl = null;
      return;
    }

    const file = fileInput.files[0];
    this.registrationForm.get('imageUrl')?.setValue(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageUrl = reader.result as string;
    };
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('name', this.registrationForm.get('name')?.value);
    formData.append('userType', this.registrationForm.get('userType')?.value);
    formData.append('email', this.registrationForm.get('email')?.value);
    formData.append('password', this.registrationForm.get('password')?.value);
    formData.append('description', this.registrationForm.get('description')?.value);

    const preferences = this.registrationForm.get('preference')?.value || [];
    preferences.forEach((pref: any) => formData.append('preference', pref));

    if (this.registrationForm.get('imageUrl')?.value) {
      formData.append('imageUrl', this.registrationForm.get('imageUrl')?.value);
    }

    this.registrationService.addUser(formData).subscribe(
      () => {
        this.isSubmitting = false;
        alert('Registration successful');
        this.registrationForm.reset();
        this.imageUrl = null;

        this.router.navigate(['/auth/login']).then(() => {});
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error details:', error.error);
        alert(`Error: ${error.error?.message || 'Unknown error'}`);
      }
    );
  }
}
