import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Preference} from '../../models/Preference';
import {RegistrationService} from '../../services/RegisterService.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userTypes: string[] = ['Individual', 'Company', 'Startup'];
  preferences: Preference[]=[];

  isSubmitting = false;

  constructor(private fb: FormBuilder,private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      description: [''],
      preference: this.fb.array([]),
      image: [null, Validators.required]
    });

    this.registrationService.getAllPreferences().subscribe((preferences: Preference[]) => {
      this.preferences = preferences;
    })

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


  onSubmit(): void {
    console.log('En el submit');
    if (this.registrationForm.invalid) return;
    console.log('Paso la validacion del submit')

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
