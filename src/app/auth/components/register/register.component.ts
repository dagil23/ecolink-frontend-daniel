import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preference } from '../../models/Preference';
import { RegistrationService } from '../../services/RegisterService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userTypes: string[] = ['client', 'startup', 'company'];
  preferences: Preference[] = [];
  imageUrl: string | null = null;
  isSubmitting = false;
  passwordStrengthText: string = '';
  passwordStrengthPercent: number = 0;
  passwordStrengthClass: string = 'bg-danger';
  password: string = '';

  passwordCriteria = {
    capitalLetter: false,
    number: false,
    specialChar: false,
    minLength: false
  };

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      preference: [[], Validators.required],
      imageUrl: [null, Validators.required],
      description: ['']
    });

    // Revalidate every time password or confirmPassword values change
    this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator(this.registrationForm);
    });

    this.registrationForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator(this.registrationForm);
    });

    // Adjust validators based on selected user type
    this.registrationForm.get('userType')?.valueChanges.subscribe(value => {
      if (value === 'company' || value === 'startup') {
        this.registrationForm.get('description')?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        this.registrationForm.get('description')?.clearValidators();
        this.registrationForm.get('description')?.setValue('');
      }
      this.registrationForm.get('description')?.updateValueAndValidity();

      if (value === 'client' || value === 'startup') {
        this.registrationService.getAllPreferences().subscribe((preferences: Preference[]) => {
          this.preferences = preferences;
        });
        this.registrationForm.get('preference')?.setValidators([Validators.required]);
      } else {
        this.registrationForm.get('preference')?.clearValidators();
        this.registrationForm.get('preference')?.setValue([]);
      }
      this.registrationForm.get('preference')?.updateValueAndValidity();
    });
  }

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): void {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return;

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

  // Update password strength
  onPasswordChange(): void {
    this.password = this.registrationForm.get('password')?.value || '';
    this.validatePassword(this.password);
  }

  // Validate password criteria
  validatePassword(password: string): void {
    const lengthValid = password.length >= 8;

    this.passwordCriteria.capitalLetter = /[A-Z]/.test(password);
    this.passwordCriteria.number = /\d/.test(password);
    this.passwordCriteria.specialChar = /[#@$%^&*!]/.test(password);
    this.passwordCriteria.minLength = lengthValid;

    let criteriaMet = Object.values(this.passwordCriteria).filter(Boolean).length;

    switch (criteriaMet) {
      case 0:
      case 1:
        this.passwordStrengthText = 'Weak';
        this.passwordStrengthClass = 'bg-danger';
        this.passwordStrengthPercent = 25;
        break;
      case 2:
        this.passwordStrengthText = 'Medium';
        this.passwordStrengthClass = 'bg-warning';
        this.passwordStrengthPercent = 50;
        break;
      case 3:
        this.passwordStrengthText = 'Good';
        this.passwordStrengthClass = 'bg-success-emphasis';
        this.passwordStrengthPercent = 75;
        break;
      case 4:
        this.passwordStrengthText = 'Strong';
        this.passwordStrengthClass = 'bg-success';
        this.passwordStrengthPercent = 100;
        break;
    }
  }

  validatePreferences(): void {
    const preferenceControl = this.registrationForm.get('preference');

    // Marcar como touched para que la validación se dispare
    preferenceControl?.markAsTouched();
    preferenceControl?.updateValueAndValidity();
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
    if (this.registrationForm.invalid) {
      Object.keys(this.registrationForm.controls).forEach(field => {
        const control = this.registrationForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      return;
    }

    this.isSubmitting = true;
    const userType: string = this.registrationForm.get('userType')?.value;
    let user: any = {
      type: userType,
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      imageUrl: ''
    };

    if (userType === 'company' || userType === 'startup') {
      user.description = this.registrationForm.get('description')?.value;
    }

    if (userType === 'client') {
      user.preferences = this.registrationForm.get('preference')?.value.map((id: any) => ({ id: +id }));
    } else if (userType === 'startup') {
      user.odsList = this.registrationForm.get('preference')?.value.map((id: any) => ({ id: +id }));
    }

    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (this.registrationForm.get('imageUrl')?.value) {
      formData.append('image', this.registrationForm.get('imageUrl')?.value);
    }

    this.registrationService.addUser(formData).subscribe({
      next: (response) => {
        const email = this.registrationForm.get('email')?.value;
        // Guardar el email en localStorage
        localStorage.setItem('userEmail', email);

        this.registrationForm.reset();
        this.imageUrl = null;

        this.router.navigate(['/auth/verification']).then(() => {});
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed!');
        this.isSubmitting = false;
      }
    });
  }

}
