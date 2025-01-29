import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'home-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getRelevantProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
