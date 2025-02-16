import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product';
import { StartupProductsService } from '../../services/StartupProducts.service';
import {Category} from '../../../startups/models/Category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-startup-products',
  templateUrl: './startup-products.component.html',
  styleUrls: ['./startup-products.component.scss']
})
export class StartupProductsComponent implements OnInit {
  // Variables para controlar las vistas
  showProducts: boolean = true;
  showSales: boolean = false;
  showAddProduct: boolean = false;
  page: number = 0;
  size: number = 8;
  products: Product[] = [];
  categories: Category[] = [];

  dropdownSettings = { // Initialize here as before for now
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    allowSearchFilter: true,
    itemsShowLimit: 3,
    noDataAvailablePlaceholderText: 'No categories found', // Mensaje si no hay datos
  };

  productForm: FormGroup;

  editingProduct: Product | null = null;

  constructor(
    private startupProductService: StartupProductsService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      categories: [[], Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  validateCategories(): void {
    const categoriesControl = this.productForm.get('categories');
    categoriesControl?.markAsTouched();
    categoriesControl?.updateValueAndValidity();
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
    // Log dropdownSettings right before showing the add product form
    console.log("dropdownSettings before showing Add Product:", this.dropdownSettings);
    this.showAddProduct = true;

    if (!this.editingProduct) {
      this.resetForm();
    }
  }

  loadCategories() {
    this.startupProductService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorías cargadas:', data);
      },
      error: (err) => console.error('Error al cargar las categorías:', err)
    });
  }

  loadProducts(): void {
    this.startupProductService.getProducts(this.page, this.size).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }


  onSubmitAddProduct() {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    const productData = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      categoryIds: this.productForm.get('categories')?.value.map((c: Category) => c.id)
    };

    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

    const imageFile = this.productForm.get('image')?.value;
    if (imageFile) {
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
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.startupProductService.addProduct(formData).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
          this.setShowProducts();
        },
        error: (err) => console.error('Error al agregar:', err)
      });
    }
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      price: null,
      categories: [],
      description: '',
      image: null,
      imageUrl: ''
    });
  }

  onEditProduct(product: Product) {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.image,
      categories: product.categories
    });
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

  changeImage(fileInput: HTMLInputElement): void {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.productForm.get('image')?.setValue(null);
      this.productForm.get('imageUrl')?.setValue(null);
      return;
    }

    const file = fileInput.files[0];
    this.productForm.get('image')?.setValue(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.productForm.get('imageUrl')?.setValue(reader.result as string);
    };
  }
}
