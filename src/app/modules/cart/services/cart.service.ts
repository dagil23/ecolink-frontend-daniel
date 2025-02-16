import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { OrderLine } from '../models/OrderLine';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = `${environment.apiUrl}/order`;
  private apiUrlPaypal: string = `${environment.apiUrl}/paypal`;

  constructor(private http: HttpClient) { }

  public getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart`, { withCredentials: true });
  }

  public updateAmount(orderLine: OrderLine): Observable<any> {
    const body = {
      id_orderLine: orderLine.id,
      amount: orderLine.amount
    }
    return this.http.put(`${this.apiUrl}/update-product`, body, { withCredentials: true });
  }

  public removeProduct(orderLineId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-product/${orderLineId}`, { withCredentials: true });
  }

  public checkout(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, body, { withCredentials: true });
  }

  public payWithCard(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, body, { withCredentials: true });
  }

  public payWithPaypal(): Observable<any> {
    return this.http.post(`${this.apiUrlPaypal}/pay`, { withCredentials: true });
  }
}
