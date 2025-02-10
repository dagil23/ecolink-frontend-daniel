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
  password: string = ''; // Track password value directly
  passwordLengthError: boolean = false;


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
      preference: [[]],
      imageUrl: [null, Validators.required],
      description: ['']
    }, { validators: this.passwordMatchValidator });  // Custom validator for matching passwords

    // Adjust validators based on selected user type
    this.registrationForm.get('userType')?.valueChanges.subscribe(value => {
      // If type is company or startup, description is required with minlength 10
      if (value === 'company' || value === 'startup') {
        this.registrationForm.get('description')?.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        this.registrationForm.get('description')?.clearValidators();
        this.registrationForm.get('description')?.setValue('');
      }
      this.registrationForm.get('description')?.updateValueAndValidity();

      // Show preferences selector only for client or startup
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

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { 'passwordMismatch': true }
      : null;
  }

  // Update password strength
  onPasswordChange(): void {
    this.password = this.registrationForm.get('password')?.value || '';
    this.calculatePasswordStrength(this.password);
  }


  // Calculate password strength
  calculatePasswordStrength(password: string): void {
    let strength = 0;
    const lengthCriteria = /.{8,}/;
    const lowercaseCriteria = /[a-z]/;
    const uppercaseCriteria = /[A-Z]/;
    const numberCriteria = /\d/;
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/;

    if (lengthCriteria.test(password)) strength++;
    if (lowercaseCriteria.test(password)) strength++;
    if (uppercaseCriteria.test(password)) strength++;
    if (numberCriteria.test(password)) strength++;
    if (specialCharCriteria.test(password)) strength++;

    this.passwordStrengthPercent = (strength / 5) * 100;

    if (strength <= 1) {
      this.passwordStrengthClass = 'bg-danger';
      this.passwordStrengthText = 'Weak';
    } else if (strength === 2 || strength === 3) {
      this.passwordStrengthClass = 'bg-warning';
      this.passwordStrengthText = 'Moderate';
    } else {
      this.passwordStrengthClass = 'bg-success';
      this.passwordStrengthText = 'Strong';
    }
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
      return;
    }
    this.isSubmitting = true;
    const userType: string = this.registrationForm.get('userType')?.value;
    // Build the user object
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
    // Append the user object as a JSON string with key "user"
    formData.append('user', JSON.stringify(user));
    // Append the image file with key "image"
    if (this.registrationForm.get('imageUrl')?.value) {
      formData.append('image', this.registrationForm.get('imageUrl')?.value);
    }

    this.registrationService.addUser(formData).subscribe({
      next: () => {
        this.registrationForm.reset();
        this.imageUrl = null;
        this.isSubmitting = false;
        this.router.navigate(['/auth/login']).then(() => {});
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed!');
        this.isSubmitting = false;
      }
    });
  }
}
