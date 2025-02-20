import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  showPopup = false;
  @Input() product!: Product;
  @Output() addProductEvent = new EventEmitter<number>();

  constructor() {}

  addProduct(): void {
    this.addProductEvent.emit(this.product.id);
    this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 2000);
  }
}
