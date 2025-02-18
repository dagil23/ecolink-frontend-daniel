import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupPostsService {
  private baseUrl = `${environment.apiUrl}/post`;

  constructor(private http: HttpClient) { }

  getStartupPosts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
