import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Challenge } from '../home/models/Challenge';
import { Pagination } from '../home/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl: string = environment.apiUrl + '/challenge';

  constructor(private http: HttpClient) { }
  
  getChallenges(page: number, size: number): Observable<Pagination<Challenge>> {
    return this.http.get<Pagination<Challenge>>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getRelevantChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.baseUrl + '/relevant');
  }
}
