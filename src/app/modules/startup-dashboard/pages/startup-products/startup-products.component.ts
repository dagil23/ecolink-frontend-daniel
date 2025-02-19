import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-startup-products',
  templateUrl: './startup-products.component.html',
  styleUrls: ['./startup-products.component.scss']
})
export class StartupProductsComponent {
  editMode = false;
  productId: string | null = null;

  constructor(public router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const match = url.match(/\/startup-dashboard\/products\/edit\/(\d+)/);
      this.editMode = !!match;
      this.productId = match ? match[1] : null;
    });
  }

  isAddOrEditActive(): boolean {
    return this.router.isActive('/startup-dashboard/products/new', false) || this.editMode;
  }
}
