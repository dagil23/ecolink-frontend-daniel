import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl + '/product';
  constructor(private http: HttpClient) { }

  getRelevantProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/relevant');
  }
}
