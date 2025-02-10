import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models/Pagination';
import { Challenge } from '../../../core/models/Challenges';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
private baseUrl: string = environment.apiUrl + '/challenge';

  constructor(private http: HttpClient) { }

  getChallenges(page: number, size: number): Observable<Pagination<Challenge>> {
    return this.http.get<Pagination<Challenge>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getChallengeById(id: string | null): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.baseUrl}/${id}`);
  }
}
