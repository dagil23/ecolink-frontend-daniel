import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/post';

  constructor(private http: HttpClient) { }

  getRecentPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/recent');
  }
}
