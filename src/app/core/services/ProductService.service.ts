import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../home/models/Product';
import { Pagination } from '../home/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl + '/product';
  constructor(private http: HttpClient) { }

  getRelevantProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/relevant');
  }

  getProducts(page: number, size: number): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getFilteredProducts(name: string, maxPrice: number, page: number, size: number): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(`${this.baseUrl}?name=${name}&pricemax=${maxPrice}&page=${page}&size=${size}`);
  }
}
