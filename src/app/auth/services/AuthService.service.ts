import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCurrentUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/user/me', { withCredentials: true });
  }
}
