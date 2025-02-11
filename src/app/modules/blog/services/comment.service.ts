import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string = environment.apiUrl + '/comment';

  constructor(private http: HttpClient) { }

  addComment(id_post: string, comment: string): Observable<any> {
    const params = new HttpParams()
      .set('id_post', id_post)
      .set('comment', comment);

    return this.http.post(`${this.baseUrl}/new`, null, { params, withCredentials: true });
  }
}
