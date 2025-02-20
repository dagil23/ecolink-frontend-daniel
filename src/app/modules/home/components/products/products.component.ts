import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/Product';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../../marketplace/services/order.service';
import { CartCountService } from '../../../../core/services/cart-count.service';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private orderService: OrderService, private cartCountService: CartCountService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.productService.getRelevantProducts().subscribe((products: Product[]) => {
      products.forEach((product: Product) => {
        if (product?.imageUrl) {
          this.authService.getImage('product', product.imageUrl).subscribe((imageUrl: string) => {
            product.imageUrl = imageUrl;
          });
        }
      });
      this.products = products;
    });
  }

  addToCart(productId: number) {
    this.authService.getCurrentUser().subscribe(() => {
      {
      }
    }, () => {
      this.router.navigate(['/auth/login']);
    });

    this.orderService.addProduct(productId).subscribe(() => {
      this.cartCountService.incrementCount();
    });
  }
}
