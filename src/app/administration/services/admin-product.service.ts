import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../core/models/Product';
import {environment} from '../../environments/environment';
import type {Observable} from 'rxjs';
import {Preference} from '../../auth/models/Preference';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private productsUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Preference[]> {
    return this.http.get<Preference[]>(this.productsUrl);
  }


  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }


  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }

}
