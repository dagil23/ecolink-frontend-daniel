import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart';
import { OrderLine } from '../../models/OrderLine';
import { CartCountService } from '../../../../core/services/cart-count.service';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  cart: Cart | undefined;

  constructor(private cartService: CartService, private cartCountService: CartCountService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart;
      this.cart.orderLines.forEach(orderLine => {
        this.authService.getImage('product', orderLine.product?.imageUrl).subscribe((imageUrl: string) => {
          if (orderLine.product?.imageUrl) {
            orderLine.product.imageUrl = imageUrl;
          }
        });
      });
    });
  }

  decrement(orderLine: OrderLine): void {
    if (orderLine.amount === 1) return;
    const updatedOrderLine = { ...orderLine, amount: orderLine.amount - 1 };

    this.cartService.updateAmount(updatedOrderLine).subscribe((data) => {
      orderLine.amount--;
      this.cartCountService.decrementCount();
      this.updateTotal();
    });
  }

  increment(orderLine: OrderLine): void {
    const updatedOrderLine = { ...orderLine, amount: orderLine.amount + 1 };

    this.cartService.updateAmount(updatedOrderLine).subscribe((data) => {
      orderLine.amount++;
      this.cartCountService.incrementCount();
      this.updateTotal();
    })
  }

  removeProduct(orderLineId: number): void {
    if (!this.cart) return;
    const index = this.cart.orderLines.findIndex(orderLine => orderLine.id === orderLineId);

    this.cartService.removeProduct(orderLineId).subscribe((data) => {
      if (this.cart) {
        this.cartCountService.removeCount(this.cart.orderLines[index].amount);
        this.cart.orderLines = this.cart.orderLines.filter(orderLine => orderLine.id !== orderLineId);
        this.updateTotal();
      }
    })
  }

  private updateTotal(): void {
    if (this.cart) {
      this.cart.total = this.cart.orderLines.reduce((sum, orderLine) =>
        sum + (orderLine.amount * orderLine.product.price), 0);
    }
  }
}
