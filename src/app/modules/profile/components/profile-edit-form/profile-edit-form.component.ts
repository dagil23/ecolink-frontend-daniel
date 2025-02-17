import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ods } from '../../../../core/models/Ods';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {
  @Input() profile: any;
  editForm: FormGroup;
  showEditForm = false;
  selectedFile?: File;
  odsList: Ods[] = [];

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.editForm = this.fb.group({
      description: ['']
    });
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      description: this.profile.description
    });
    this.profileService.getOds().subscribe((ods: Ods[]) => {
      this.odsList = ods;
      console.log('ODS data:', this.odsList);
    });
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; 
      console.log('Archivo seleccionado:', this.selectedFile);
    }
  }
  

  onSubmit(): void {
    if (this.editForm.valid) {
      const data = {
        description: this.editForm.get('description')?.value || ''
      };
  
      console.log('Enviando data:', data);
      console.log('Enviando imagen:', this.selectedFile);
  
      this.profileService.updateProfile(data, this.selectedFile).subscribe(() => {
        this.toggleEditForm();
        window.location.reload();
      });
    }
  }
}
  
