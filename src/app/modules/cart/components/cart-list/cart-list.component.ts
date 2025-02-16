import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/Cart';
import { OrderLine } from '../../models/OrderLine';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  cart: Cart | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }

  decrement(orderLine: OrderLine): void {
    if(orderLine.amount === 1) return ;
    const updatedOrderLine = { ...orderLine, amount: orderLine.amount - 1 };

    this.cartService.updateAmount(updatedOrderLine).subscribe((data) => {
      orderLine.amount--;
      this.updateTotal();
    });
  }

  increment(orderLine: OrderLine): void {
    const updatedOrderLine = { ...orderLine, amount: orderLine.amount + 1 };

    this.cartService.updateAmount(updatedOrderLine).subscribe((data) => {
      orderLine.amount++;
      this.updateTotal();
    })
  }

  removeProduct(orderLineId: number): void {
    this.cartService.removeProduct(orderLineId).subscribe((data) => {
      if (this.cart) {
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
