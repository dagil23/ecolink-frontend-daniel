import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../../core/models/Post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl: string = environment.apiUrl + '/post';

  constructor(private http: HttpClient) { }

  getPostById(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }
}
