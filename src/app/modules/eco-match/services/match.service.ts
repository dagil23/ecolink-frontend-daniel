import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../../../core/models/Match';
import { Pagination } from '../../../core/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matches: Match[] = [];
  currentPage = 0;
  totalPage = 0;

  private baseUrl: string = `${environment.apiUrl}/compatibility`;

  constructor(private http: HttpClient) { }

  getCompability(filters: any, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    // Añadir orden si existe
    if (filters.order && filters.order.trim() !== '') {
      params = params.set('order', filters.order.toUpperCase());
    }
    
    // Añadir filtro por nombre si existe
    if (filters.name && filters.name.trim() !== '') {
      params = params.set('name', filters.name);
    }

    // Añadir filtro por país si existe
    if (filters.country && filters.country.trim() !== '') {
      params = params.set('country', filters.country);
    }

    // Log para depuración
    console.log('Params enviados al servidor:', params.toString());

    return this.http.get<Pagination<Match>>(this.baseUrl, {params, withCredentials: true });
  }
  
  getCurrentUser(): Observable<any> {
    return this.http.get(environment.apiUrl + '/auth/user/me', { withCredentials: true });
  }
}
