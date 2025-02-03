import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService.service';
import { Product } from '../../home/models/Product';
import { Pagination } from '../../home/models/Pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(this.currentPage, 8).subscribe((data: Pagination<Product>) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
}
