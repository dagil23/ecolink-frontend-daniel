import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Startup } from '../home/models/Startup';
import { Pagination } from '../home/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private baseUrl: string = environment.apiUrl + '/startup';
  constructor(private http: HttpClient) { }

  getRelevantStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.baseUrl + '/relevant');
  }

  getStartups(page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  findStartupById(id: string): Observable<Startup> {
    return this.http.get<Startup>(`${this.baseUrl}/${id}`);
  }

  getStartupsByName(name: string, page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${this.baseUrl}?name=${name}&page=${page}&size=${size}`);
  }

  getStartupsByOds(odsId: number, page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${this.baseUrl}?odsIdList=${odsId}&page=${page}&size=${size}`);
  }

  getStartupsByNameAndOds(odsId: number, name:string, page: number, size: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${this.baseUrl}?odsIdList=${odsId}&name=${name}&page=${page}&size=${size}`);
  }
}
