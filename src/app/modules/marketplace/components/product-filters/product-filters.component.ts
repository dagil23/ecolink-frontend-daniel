import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent {
  filters = { name: '', price: 1000 };
  @Output() filterChange = new EventEmitter<any>();

  name: string = '';
  priceValue: number = 1000;

  constructor() { }

  applyFilters() {
    this.filterChange.emit({ ...this.filters });
  }

  clearFilters() {
    this.filters = { name: '', price: 1000 };
    this.applyFilters();
  }
}
