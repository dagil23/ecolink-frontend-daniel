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

  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, formData, { withCredentials: true });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { withCredentials: true });
  }

  updatePost(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit/${id}`, formData, { withCredentials: true });
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
