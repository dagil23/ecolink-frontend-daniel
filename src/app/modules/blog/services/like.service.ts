import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  baseUrl: string = `${environment.apiUrl}/like`;

  constructor(private http: HttpClient) { }

  addLike(id_post: number) {
    return this.http.post(`${this.baseUrl}?id_post=${id_post}`, {}, { withCredentials: true });
  }

  removeLike(id_post: number) {
    return this.http.delete(`${this.baseUrl}?id_post=${id_post}`, { withCredentials: true });
  }
}
