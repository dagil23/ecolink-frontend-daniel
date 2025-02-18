import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { StartupProductsService } from '../../services/StartupProducts.service';
import { Category } from '../../../startups/models/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-startup-products',
  templateUrl: './startup-products.component.html',
  styleUrls: ['./startup-products.component.scss']
})
export class StartupProductsComponent implements OnInit {
  showProducts: boolean = true;
  showSales: boolean = false;
  showAddProduct: boolean = false;
  products: Product[] = [];
  categories: Category[] = [];
  productForm: FormGroup;
  editingProduct: Product | null = null;
  imageUrl: string | null = null;

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    itemsShowLimit: 3,
    noDataAvailablePlaceholderText: 'No categories found'
  };

  constructor(
    private startupProductService: StartupProductsService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categories: [[], Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.startupProductService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  loadProducts(): void {
    this.startupProductService.getStartupProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;

        this.products.forEach((product) => {
          if (product.imageUrl) {
            this.authService.getImage('product', product.imageUrl).subscribe({
              next: (imageUrl: string) => {
                product.imageUrl = imageUrl;
              },
              error: (err) => console.error('Error al obtener la imagen:', err)
            });
          }
        });
      },
      error: (error) => console.error('Error al cargar productos:', error)
    });
  }

  setShowProducts() {
    this.showProducts = true;
    this.showSales = false;
    this.showAddProduct = false;
    this.editingProduct = null;
    this.loadProducts();
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

    if (!this.editingProduct) {
      this.resetForm();
    }
  }

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.productForm.get('imageUrl')?.setValue(this.editingProduct ? this.editingProduct.imageUrl : null);
      this.imageUrl = this.editingProduct ? this.editingProduct.imageUrl : null;
      return;
    }

    const file = fileInput.files[0];
    this.productForm.get('imageUrl')?.setValue(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmitAddProduct() {
    // Marcar todos los controles como touched para mostrar errores
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });

    if (this.productForm.invalid) return;

    const selectedCategories = this.productForm.get('categories')?.value || [];
    const productData = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      categories: selectedCategories.map((category: Category) => category.id)
    };

    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    const imageFile = this.productForm.get('imageUrl')?.value;
    if (imageFile && imageFile instanceof File) {
      formData.append('image', imageFile);
    }

    if (this.editingProduct) {
      formData.append('id', this.editingProduct.id.toString());
      this.startupProductService.updateProduct(formData).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
          this.editingProduct = null;
          this.setShowProducts();
        },
        error: (err) => console.error('❌ Error al actualizar producto:', err)
      });
    } else {
      this.startupProductService.addProduct(formData).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
          this.setShowProducts();
        },
        error: (err) => console.error('❌ Error al agregar producto:', err)
      });
    }
  }

  onEditProduct(product: Product) {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      categories: product.categories
    });
    this.imageUrl = product.imageUrl;
    this.setShowAddProduct();
  }

  onDeleteProduct(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.startupProductService.deleteProduct(productId).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error al eliminar el producto:', err)
      });
    }
  }

  validateCategories(): void {
    const categoriesControl = this.productForm.get('categories');
    if (!categoriesControl?.value || categoriesControl.value.length === 0) {
      categoriesControl?.setErrors({ required: true });
    }
    categoriesControl?.markAsTouched();
    categoriesControl?.updateValueAndValidity();
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      price: null,
      categories: [],
      description: '',
      imageUrl: '',
    });
    this.imageUrl = null;
  }
}
