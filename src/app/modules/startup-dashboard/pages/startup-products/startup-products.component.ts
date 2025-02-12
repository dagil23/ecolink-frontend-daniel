import { Component } from '@angular/core';

@Component({
  selector: 'app-startup-products',
  templateUrl: './startup-products.component.html',
  styleUrl: './startup-products.component.scss'
})
export class StartupProductsComponent {
  showProducts: boolean = false;
  showSales: boolean = false;
  showAddProduct: boolean = true;

  constructor() {}

  setShowProducts() {
    this.showProducts = true;
    this.showSales = false;
    this.showAddProduct = false;
  }

  setShowSales() {
    this.showProducts = false;
    this.showSales = true;
    this.showAddProduct = false;
  }

  setShowAddProduct() {
    this.showProducts = false;
    this.showSales = false;
    this.showAddProduct = true;
  }
}
