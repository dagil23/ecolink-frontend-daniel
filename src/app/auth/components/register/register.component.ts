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

    const userType = this.registrationForm.get('userType')?.value;


    const userData: any = {
      type: userType.toLowerCase(),
      name: this.registrationForm.get('name')?.value,
      userType: userType.toUpperCase(),
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
    };


    if (userType === 'Company' || userType === 'Startup') {
      userData.description = this.registrationForm.get('description')?.value;
      userData.preference = this.registrationForm.get('preference')?.value || [];
    }


    formData.append('user', JSON.stringify(userData));


    if (this.registrationForm.get('imageUrl')?.value) {
      formData.append('image', this.registrationForm.get('imageUrl')?.value);
    }

    this.registrationService.addUser(formData).subscribe({
      next: () => {
        alert('Successfully registered!');
        this.registrationForm.reset();
        this.imageUrl = null;
        this.isSubmitting = false;
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Registration failed!');
        this.isSubmitting = false;
      }
    });
  }


}
