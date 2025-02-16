import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Amount } from '../models/Amount';

@Injectable({
  providedIn: 'root'
})
export class CartCountService {
  private apiUrl: string = `${environment.apiUrl}/order`
  private cartCount = new BehaviorSubject<number>(0);
  currentCount = this.cartCount.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartCount();
  }

  updateCount() {
    this.cartCount.next(this.cartCount.value + 1);
  }

  loadCartCount() {
    this.http.get<Amount>(`${this.apiUrl}/amount`, { withCredentials: true }).subscribe((response: Amount) => {
      this.cartCount.next(response.amount);
    });
  }
}
