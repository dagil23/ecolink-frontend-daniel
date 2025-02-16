import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/Product';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../../marketplace/services/order.service';
import { CartCountService } from '../../../../core/services/cart-count.service';

@Component({
  selector: 'home-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private orderService: OrderService, private cartCountService: CartCountService) { }

  ngOnInit() {
    this.productService.getRelevantProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addToCart(productId: number) {
    this.orderService.addProduct(productId).subscribe(() => {
      this.cartCountService.updateCount();
    });
  }
}
