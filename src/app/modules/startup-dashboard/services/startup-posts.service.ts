import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class StartupPostsService {
  private baseUrl = `${environment.apiUrl}/post`;

  constructor(private http: HttpClient) { }

  getStartupPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/startup`, { withCredentials: true });
  }
}
