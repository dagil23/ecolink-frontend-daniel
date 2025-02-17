import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-startup-form-post',
  templateUrl: './startup-form-post.component.html',
  styleUrl: './startup-form-post.component.scss'
})
export class StartupFormPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      startup: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      postDate: ['', Validators.required],
      imageUrl: ['', Validators.required],
      ods: [[], Validators.required]
    })
  }

  onSubmit(): void {
    if(!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return ;
    };
  }
}
