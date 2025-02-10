import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models/Pagination';
import { Product } from '../../../core/models/Product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl + '/product';
  constructor(private http: HttpClient) { }


  getProducts(filters: any, page: number, size: number): Observable<Pagination<Product>> {
    let params = new HttpParams()
      .set('name', filters.name || '')
      .set('pricemax', filters.price || 100000000000)
      .set('page', page.toString())
      .set('size', size.toString());
      
    return this.http.get<Pagination<Product>>(`${this.baseUrl}?page=${page}&size=${size}`, { params });
  }

  getFilteredProducts(name: string, maxPrice: number, page: number, size: number): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(`${this.baseUrl}?name=${name}&pricemax=${maxPrice}&page=${page}&size=${size}`);
  }
    getProductById(id: string | null): Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }
}
