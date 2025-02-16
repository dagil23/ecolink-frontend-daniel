import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = environment.apiUrl + '/order';

  constructor(private http: HttpClient) { }

  addProduct(id_product: number, amount: number = 1): Observable<any> {
    const body = {
      id_product,
      amount
    };
    return this.http.post(`${this.baseUrl}/add-product`, body, {withCredentials: true});
  }
}
