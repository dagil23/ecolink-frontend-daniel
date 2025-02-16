import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from "../models/Product";
import {Category} from '../../cart/models/Category';

@Injectable({
  providedIn: 'root'
})
export class StartupProductsService {
  private productUrl = `${environment.apiUrl}/product`;
  private categoryUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getProducts(page: number, size: number): Observable<Product[]> {
    return this.http.get<{ content: Product[] }>(`${this.productUrl}?page=${page}&size=${size}`).pipe(
      map(response => response.content)
    );
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.productUrl}/new`, formData);
  }


  updateProduct(formData: FormData): Observable<Product> {
    const id = formData.get('id');
    return this.http.put<Product>(`${this.productUrl}/${id}`, formData);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }
}
