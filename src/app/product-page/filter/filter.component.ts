import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/ProductService.service';
import { Product } from '../../home/models/Product';

@Component({
  selector: 'productpage-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() public filteredProducts = new EventEmitter<{ name: string, price: number }>();

  name: string = '';
  priceValue: number = 1000;

  constructor(private productService: ProductService) { }

  applyFilters(event: Event) {
    this.filteredProducts.emit({ name: this.name, price: this.priceValue });
  }

  clearFilters(event: Event) {
    event.preventDefault();
    this.name = '';
    this.priceValue = 1000;
    this.filteredProducts.emit({ name: this.name, price: this.priceValue });
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
    this.applyFilters(event);
  }
}