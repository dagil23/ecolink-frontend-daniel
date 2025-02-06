import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/Product';
import { Pagination } from '../../core/models/Pagination';
import { ProductService } from '../../core/services/ProductService.service';

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
  name: string = '';
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
    console.log(this.products);
    this.totalPages = data.totalPages;
  }

  saveFilters(filters: {name:string, price: number}) {
    this.name = filters.name;
    this.maxPrice = filters.price;
    this.isFiltered = true;
    this.currentPage = 0;
    this.applySavedFilters();
  }

  applySavedFilters() {
    this.productService.getFilteredProducts(this.name, this.maxPrice, this.currentPage, 8).subscribe((data: Pagination<Product>) => {
      this.filteredProducts(data);
      console.log(data);
    }, () => {
      this.products = [];
      this.message = 'No products found with the given filters';
    });
  }
}
