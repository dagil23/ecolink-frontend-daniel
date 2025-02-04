import { Component } from '@angular/core';

@Component({
  selector: 'productpage-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  minPrice: number = 0;
  priceValue: number = 100;

  constructor(){}

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
