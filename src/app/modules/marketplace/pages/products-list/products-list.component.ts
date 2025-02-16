import { Component } from '@angular/core';
import { Pagination } from '../../../../core/models/Pagination';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { OrderService } from '../../services/order.service';
import { CartCountService } from '../../../../core/services/cart-count.service';

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

  constructor(private productService: ProductService, private orderService: OrderService, private cartCountService: CartCountService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.filters, this.currentPage, 8).subscribe((data: Pagination<Product>) => {
      this.products = data.content;
      this.totalPages = data.totalPages;
      this.message = '';
      console.log(data.content)
    }, error => {
      this.products = [];
      this.message = 'Products not found';
    });
  }

  onAddProduct(productId: number) {
    this.orderService.addProduct(productId).subscribe((data) => {
      this.cartCountService.updateCount();
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
