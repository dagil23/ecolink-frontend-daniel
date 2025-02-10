import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecentPost } from '../../../core/models/RecentPost';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl: string = environment.apiUrl + '/post';

  constructor(private http: HttpClient) { }

  getRecentArticles(): Observable<RecentPost[]> {
    return this.http.get<RecentPost[]>(this.baseUrl + '/recent');
  }
}
