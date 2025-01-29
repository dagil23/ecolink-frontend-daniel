import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = 'http://localhost:8080/api/product';
  constructor(private http: HttpClient) { }

  getRelevantProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/relevant');
  }
}
