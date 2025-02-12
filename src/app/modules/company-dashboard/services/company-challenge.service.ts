import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../../../core/models/Challenge';

@Injectable({
  providedIn: 'root'
})
export class CompanyChallengeService {

  private baseUrl: string = environment.apiUrl + '/challenge';

  constructor(private http: HttpClient) {}

  getCompanyChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.baseUrl}/company`);
  }

  getChallengeById(id: string): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.baseUrl}/${id}`);
  }

  createChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(this.baseUrl, challenge);
  }

  updateChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.put<Challenge>(`${this.baseUrl}/${challenge.id}`, challenge);
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
