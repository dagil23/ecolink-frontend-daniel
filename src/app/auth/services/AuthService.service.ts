import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/user/me', { withCredentials: true });
  }

  getImage(name_image: string): Observable<string> {
    return of(`${this.baseUrl}/image/${name_image}`);
  }


  isAuthenticated(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/user/me', { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
