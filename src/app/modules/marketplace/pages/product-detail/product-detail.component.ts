import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { OrderService } from '../../services/order.service';
import { CartCountService } from '../../../../core/services/cart-count.service';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService, private cartCountService: CartCountService, private authService: AuthService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
      if (this.product?.imageUrl) {
        this.authService.getImage('product', product.imageUrl).subscribe((imageUrl: string) => {
          this.product.imageUrl = imageUrl;
        });
      }
    });
  }

  addToCart(): void {
    this.orderService.addProduct(this.product.id).subscribe(() => {
      this.cartCountService.incrementCount();
    });
  }
}
