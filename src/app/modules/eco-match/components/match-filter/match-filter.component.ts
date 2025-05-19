import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../../../../auth/services/RegisterService.service';

@Component({
  selector: 'app-match-filter',
  templateUrl: './match-filter.component.html',
  styleUrl: './match-filter.component.scss'
})
export class MatchFilterComponent {

  @Input() listCountries = new Set<Country>();
  @Output() filterChange = new EventEmitter<{ country: string, order:string}>();
  
  filters = {  country: '', order: '' };
  Array = Array; // Hacer disponible Array en el template

  // Opciones de ordenamiento
  orderOptions = [
    { value: 'DESC', label: 'Highest compatibility first' },
    { value: 'ASC', label: 'Lowest compatibility first' }
  ];

  applyFilters() {
    console.log('Aplicando filtros:', this.filters);
    this.filterChange.emit(this.filters);
  }

  clearFilters() {
    this.filters = { country: '', order: '' };
    console.log('Filtros limpiados');
    this.filterChange.emit(this.filters);
  }
}
