import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserPending } from '../models/UserPending';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl: string = `${environment.apiUrl}/admin`

  constructor(private http: HttpClient) { }

  usersPending(): Observable<UserPending[]> {
    return this.http.get<UserPending[]>(`${this.baseUrl}/user/pending`, { withCredentials: true });
  }

  validateCompany(id: number, state: string): Observable<any> {
    const params = new HttpParams().set('state', state);
    return this.http.post(`${this.baseUrl}/validate-company/${id}`, {}, { params, withCredentials: true });
  }

  validateStartup(id: number, state: string): Observable<any> {
    const params = new HttpParams().set('state', state);
    return this.http.post(`${this.baseUrl}/validate-startup/${id}`, {}, { params, withCredentials: true });
  }
}
