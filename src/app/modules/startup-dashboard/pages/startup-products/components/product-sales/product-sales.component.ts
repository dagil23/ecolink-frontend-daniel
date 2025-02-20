import { Component, OnInit } from '@angular/core';
import { StartupProductsService } from '../../../../services/StartupProducts.service';

@Component({
  selector: 'app-sales',
  templateUrl: './product-sales.component.html',
  styleUrls: ['./product-sales.component.scss']
})
export class ProductSalesComponent implements OnInit {
  sales:any;

  constructor(private startupProductsService: StartupProductsService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.startupProductsService.getSales().subscribe({
      next: (sales) => {
        this.sales = sales;
      },
      error: (err) => console.error('Error loading sales:', err)
    });
  
  }
}
