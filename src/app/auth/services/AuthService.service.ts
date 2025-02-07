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

  getImage(type: string, name_image: string): Observable<string> {
    return of(`${this.baseUrl}/image?type=${type}&name_image=${name_image}`);
  }


  isAuthenticated(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/user/me', { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/logout', {}, { withCredentials: true });
  }

}
