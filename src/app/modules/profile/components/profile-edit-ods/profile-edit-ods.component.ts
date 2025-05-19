import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit-ods',
  templateUrl: './profile-edit-ods.component.html',
  styleUrls: ['./profile-edit-ods.component.scss']
})
export class ProfileEditOdsComponent implements OnInit {
  @Output() odsUpdated = new EventEmitter<number[]>();

  odsForm: FormGroup;
  profileUser: any;
  odsOptions: any[] = [];
  userSelectedOds: any[] = [];
  showOdsForm = false;
  

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.odsForm = this.fb.group({
      ods: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getProfile();
  }
  
  getProfile(): void {
    this.profileService.getProfile().subscribe((profile) => {
      this.profileUser = profile;
      if (this.profileUser.userOdsList != null) {
        this.userSelectedOds = this.profileUser.userOdsList.map((ods: any) => ods.id);
      }
      this.getOds(); // Llama a getOds después de obtener el perfil para poder tener todo listo a la hora de mostrar el formulario
    });
  }

  //En este metodo se obtienen todas las ODS y ademas se setea el control odsForm
  getOds(): void {
    this.profileService.getOds().subscribe((ods) => {
      this.odsOptions = ods;
      this.odsForm.setControl('ods', this.loadOdsForm());
    });
  }

  //Este metodo se encarga de cargar el formulario con las ODS, pero ademas nos permite saber si la ODS esta seleccionada o no
  loadOdsForm(): FormArray {
    const arrayControles = this.odsOptions.map(ods => this.fb.group({
      id: [ods.id],
      name: [ods.name],
      selected: [this.userSelectedOds.includes(ods.id)]
    }));
    return this.fb.array(arrayControles);
  }

  //Este metedo es el encargado de obtener el FormArray que utilizaremos en el template
  getOdsFormArray(): FormArray {
    return this.odsForm.get('ods') as FormArray;
  }

  onSubmit(): void {
    if (this.odsForm.valid) {
      const selectedIds = this.odsForm.value.ods
        .filter((control: any) => control.selected)
        .map((control: any) => control.id);
      
      // Si no hay ODS seleccionadas, mostrar alerta y no continuar
      if (selectedIds.length === 0) {
        alert('You must selected at least one !');
        return;
      }

      // Si hay ODS seleccionadas, emitir el evento y cerrar el formulario
      this.odsUpdated.emit(selectedIds);
      this.toggleOdsForm();
    }
  }

  //Este metodo nos permite mostrar u ocultar el formulario
  toggleOdsForm(): void {
    this.showOdsForm = !this.showOdsForm;
    
    // Si estamos cerrando el formulario y no fue por submit, restaurar selecciones originales
    if (!this.showOdsForm) {
      // Reinicializar el formulario con las selecciones originales
      this.odsForm.setControl('ods', this.loadOdsForm());
    }
  }

  // Método simple para verificar si hay ODS seleccionadas
  hasAnyOdsSelected(): boolean {
    return this.odsForm.value.ods && this.odsForm.value.ods.some((ods: any) => ods.selected);
  }
 
}