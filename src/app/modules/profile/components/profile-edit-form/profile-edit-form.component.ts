import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {
  @Input() profile: any;
  @Output() profileUpdated = new EventEmitter<void>();

  editForm: FormGroup;
  showEditForm = false;
  selectedFile?: File;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.editForm = this.fb.group({
      description: ['']
    });
  }

  ngOnInit(): void {
    this.editForm.patchValue({
      description: this.profile.description
    });
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log("El archivo es", this.selectedFile)
    }
  }

  clearFile(): void {
    this.selectedFile = undefined;
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      // Crear el objeto de datos
      const data = {
        description: this.editForm.get('description')?.value || this.profile.description
      };

    
      // Crear el FormData
      const formData = new FormData();
      formData.append('data', JSON.stringify(data)); // Datos en formato JSON

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      console.log('Enviando FormData:', formData.get('data'), formData.get('image'));

      this.profileService.updateProfile(data, this.selectedFile).subscribe(() => {
        console.log('Perfil actualizado exitosamente');
        this.profileUpdated.emit(); // Notifica al componente padre
        this.toggleEditForm();
      });
    }
    window.location.reload();
  }

}
