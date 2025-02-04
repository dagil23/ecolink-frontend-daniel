import { Component } from '@angular/core';

@Component({
  selector: 'productpage-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  minPrice: number = 0;
  priceValue: number = 100;

  constructor(){}

  validatePrice(value: number): void {
    if (value > 1000) {
      this.priceValue = 1000;
    } else if (value < 0) {
      this.priceValue = 0;
    } else {
      this.priceValue = value;
    }
  }
}
