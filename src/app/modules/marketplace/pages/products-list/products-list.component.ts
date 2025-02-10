import { Component } from '@angular/core';
import { Pagination } from '../../../../core/models/Pagination';
import { Product } from '../../../../core/models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  products: Product[] = [];
  filters = { name: '', price: null };
  message: string = '';
  currentPage = 0;
  totalPages = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.filters, this.currentPage, 8).subscribe((data: Pagination<Product>) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
      this.message = '';
    }, error => {
      this.products = [];
      this.message = 'Products not found';
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  applyFilters(filters: any) {
    this.filters = filters;
    this.currentPage = 0;
    this.loadProducts();
  }
}
