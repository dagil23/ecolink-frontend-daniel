import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService.service';
import { Product } from '../../home/models/Product';
import { Pagination } from '../../home/models/Pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 0;
  // Filters
  search: string = '';
  maxPrice: number = 100;
  isFiltered: boolean = false;
  // Alert message
  message: string = '';

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

    if(this.isFiltered) {
      this.applySavedFilters();
    } else {
      this.getProducts();
    }
  }

  filteredProducts(data: Pagination<Product>) {
    this.products = data.content;
    this.totalPages = data.totalPages;
  }

  saveFilters(filters: {search:string, price: number}) {
    this.search = filters.search;
    this.maxPrice = filters.price;
    this.isFiltered = true;
    this.currentPage = 0;
    this.applySavedFilters();
  }

  applySavedFilters() {
    this.productService.getFilteredProducts(this.search, this.maxPrice, this.currentPage, 8).subscribe((data: Pagination<Product>) => {
      this.filteredProducts(data);
    }, () => {
      this.products = [];
      this.message = 'No products found with the given filters';
    });
  }
}
