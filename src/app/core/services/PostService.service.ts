import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecentPost } from '../models/RecentPost';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/post';

  constructor(private http: HttpClient) { }

  getRecentPosts(): Observable<RecentPost[]> {
    return this.http.get<RecentPost[]>(this.baseUrl + '/recent');
  }

  getPost(id: string | null): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + '/' + id);
  }
}
