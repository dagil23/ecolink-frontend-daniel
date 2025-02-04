import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/ProductService.service';
import { Product } from '../../home/models/Product';

@Component({
  selector: 'productpage-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() public filteredProducts = new EventEmitter<{ search: string, price: number }>();

  search: string = '';
  priceValue: number = 100;

  constructor(private productService: ProductService) { }

  applyFilters(event: Event) {
    this.filteredProducts.emit({ search: this.search, price: this.priceValue });
  }

  clearFilters(event: Event) {
    event.preventDefault();
    this.search = '';
    this.priceValue = 100;
    this.filteredProducts.emit({ search: this.search, price: this.priceValue });
  }

  validatePrice(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = Number(inputElement.value);
    if (value > 1000) {
      this.priceValue = 1000;
    } else if (value < 0) {
      this.priceValue = 0;
    } else {
      this.priceValue = value;
    }
  }
}