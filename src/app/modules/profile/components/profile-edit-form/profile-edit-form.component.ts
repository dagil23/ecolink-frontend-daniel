import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ods } from '../../../../core/models/Ods';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { User } from '../../../../core/models/User';

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
  
  isLogged: boolean = false;
  isClient: boolean = false;
  isStartup: boolean = false;
  isCompany: boolean = false;
  userType: 'client' | 'company' | 'startup' | null = null;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private authService: AuthService) {
    this.editForm = this.fb.group({
      description: [''],
      ods: [[]]
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User) => {
          this.isLogged = !!user;
          if (user) {
            if (user.userType.toUpperCase() === 'CLIENT') {
              this.isClient = true;
              this.userType = 'client';
            } else if (user.userType.toUpperCase() === 'STARTUP') {
              this.isStartup = true;
              this.userType = 'startup';
            } else if (user.userType.toUpperCase() === 'COMPANY') {
              this.isCompany = true;
              this.userType = 'company';
            }
          }
        });
    console.log('Profile data:', this.profile);
    this.profileService.getOds().subscribe((ods: Ods[]) => {
      this.odsList = ods;
      console.log('ODS data:', this.odsList);

      if (this.isStartup || this.isClient) {
        // Convert ODS names to IDs
        const odsIds = this.profile.odsList.map((profileOds: any) => {
          const ods = this.odsList.find(o => o.name === profileOds.name);
          return ods ? ods.id : null;
        }).filter((id: number | null) => id !== null);
  
        this.editForm.patchValue({
          description: this.profile.description,
          ods: odsIds
        });
      } else if (this.isCompany) {
        this.editForm.patchValue({
          description: this.profile.description
        });
      }
      console.log('Form data:', this.editForm.value);
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
        description: this.editForm.get('description')?.value || '',
        odsIdList: this.editForm.get('ods')?.value.map((odsId: number) => odsId) || []
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
  
