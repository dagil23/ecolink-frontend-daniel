import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ods } from '../../../../core/models/Ods';
import { OdsService } from '../../../startups/services/ods.service';

@Component({
  selector: 'app-startup-form-post',
  templateUrl: './startup-form-post.component.html',
  styleUrl: './startup-form-post.component.scss'
})
export class StartupFormPostComponent implements OnInit {
  postForm!: FormGroup;
  odsList: Ods[] = [];

  constructor(private fb: FormBuilder, private odsService: OdsService) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      startup: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [null, Validators.required],
      ods: [[], Validators.required]
    });

    this.odsService.getOds().subscribe((ods: Ods[]) => {
      this.odsList = ods;
    });
  }

  onSubmit(): void {
    console.log('h')
    if(!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return ;
    };

    console.log('gg')
    console.log(this.postForm.value);

    const post = {
      title: '',
      shortDescription: '',
      description: '',
      odsList: []
    };
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

  validateOdsList(): void {
    const preferenceControl = this.postForm.get('ods');

    preferenceControl?.markAsTouched();
    preferenceControl?.updateValueAndValidity();
  }
}
