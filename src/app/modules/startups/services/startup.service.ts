import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models/Pagination';
import { Startup } from '../../../core/models/Startup';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private baseUrl: string = environment.apiUrl + '/startup';

  constructor(private http: HttpClient) { }

  getStartups(filters: any, page: number, size: number): Observable<Pagination<Startup>> {
    let params = new HttpParams()
    .set('name', filters.search || '')
    .set('page', page.toString())
    .set('size', size.toString());

    if (filters.odsId) {
      params = params.append('odsIdList', filters.odsId.toString());
    }

    return this.http.get<Pagination<Startup>>(`${this.baseUrl}?page=${page}&size=${size}`, { params });
  }

  findStartupById(id: string): Observable<Startup> {
    return this.http.get<Startup>(`${this.baseUrl}/${id}`);
  }
}
