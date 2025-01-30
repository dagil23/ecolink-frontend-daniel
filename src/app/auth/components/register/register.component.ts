/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userTypes: string[] = ['Individual', 'Company', 'Startup'];
  preferences: string[] = [];

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      description: [''],
      website: ['', [Validators.pattern('https?://.+')]],
      image: [null, Validators.required]
    });

    this.fetchPreferences();

    // Conditional validation for description
    this.registrationForm.get('userType')?.valueChanges.subscribe(value => {
      if (value === 'Company' || value === 'Startup') {
        this.registrationForm.get('description')?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        this.registrationForm.get('description')?.clearValidators();
      }
      this.registrationForm.get('description')?.updateValueAndValidity();
    });
  }

  fetchPreferences(): void {
    // Simulating an HTTP call to the backend
    setTimeout(() => {
      this.preferences = ['Renewable Energy', 'Green Technology', 'Recycling', 'Water and Sanitation'];
    }, 1000);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) return;

    this.isSubmitting = true;
    console.log('Form submitted:', this.registrationForm.value);

    // Simulating a submission (replace with an HTTP request)
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Registration successful');
      this.registrationForm.reset();
    }, 2000);
  }
}

 */
