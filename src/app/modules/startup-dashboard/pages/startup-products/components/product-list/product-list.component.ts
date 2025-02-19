import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../models/Product';
import { StartupProductsService } from '../../../../services/StartupProducts.service';
import { AuthService } from '../../../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  noProductsMessage = "No products available"; // Mensaje que se mostrará cuando no haya productos.

  constructor(
    private productService: StartupProductsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getStartupProducts().subscribe({
      next: (products) => {
        this.products = products;

        // Cargar las imágenes de los productos
        this.products.forEach((product) => {
          if (product.imageUrl) {
            this.authService.getImage('product', product.imageUrl).subscribe({
              next: (imageUrl: string) => {
                product.imageUrl = imageUrl;
              },
              error: (err) => console.error('Error loading product image:', err)
            });
          }
        });
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  onEditProduct(product: Product): void {
    this.router.navigate(['/startup-dashboard/products/edit', product.id]);
  }

  onDeleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          // Eliminar el producto del array de productos inmediatamente.
          this.products = this.products.filter(product => product.id !== productId);

          // Si no quedan productos, mostrar el mensaje.
          if (this.products.length === 0) {
            this.noProductsMessage = "No products available";
          }
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}
