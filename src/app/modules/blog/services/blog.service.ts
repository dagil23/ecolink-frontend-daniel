import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/Post';
import { RelevantPost } from '../models/relevantPost';
import { Pagination } from '../../../core/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl: string = environment.apiUrl + '/post';

  constructor(private http: HttpClient) { }

  getPosts(page: number, size: number): Observable<Pagination<Post[]>> {
    return this.http.get<Pagination<Post[]>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  getRelevantPosts(id: string): Observable<RelevantPost[]> {
    return this.http.get<RelevantPost[]>(`${this.baseUrl}/relevant/${id}`);
  }
}
