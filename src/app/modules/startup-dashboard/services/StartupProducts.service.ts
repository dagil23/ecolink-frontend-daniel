import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/Product';
import { Category } from '../../cart/models/Category';

@Injectable({
  providedIn: 'root'
})
export class StartupProductsService {
  private baseUrl = environment.apiUrl;
  private productUrl = `${environment.apiUrl}/product`;
  private categoryUrl = `${environment.apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl, { withCredentials: true });
  }
  getStartupProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/startup/product`, { withCredentials: true });
  }
  getSales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/startup/sales`, { withCredentials: true });
  }

  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.productUrl}/new`, formData, { withCredentials: true });
  }

  updateProduct(formData: FormData): Observable<Product> {
    const id = formData.get('id');
    return this.http.put<Product>(`${this.productUrl}/${id}`, formData, { withCredentials: true });
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`, { withCredentials: true });
  }
}
