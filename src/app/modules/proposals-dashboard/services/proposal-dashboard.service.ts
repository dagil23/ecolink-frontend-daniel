import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Proposal} from '../../../core/models/Proposal';
import {Product} from '../../../core/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private proposalUrl = `${environment.apiUrl}/proposal`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.proposalUrl);
  }

  addProduct(product: Proposal): Observable<Proposal> {
    return this.http.post<Proposal>(this.proposalUrl, product);
  }



  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.proposalUrl}/${id}`);
  }
}
