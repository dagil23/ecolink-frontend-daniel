import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../core/models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl + '/product';
  constructor(private http: HttpClient) { }

  getRelevantProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/home');
  }
}
