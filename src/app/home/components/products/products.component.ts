import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/productService.service';

@Component({
  selector: 'home-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(productServiceService: ProductServiceService) {

  }
}
