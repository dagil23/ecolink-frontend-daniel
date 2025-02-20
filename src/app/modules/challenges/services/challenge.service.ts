import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models/Pagination';
import { Challenge } from '../../../core/models/Challenges';
import {Proposal} from '../../startup-dashboard/models/Proposal';

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
  getCurrentUser(): Observable<any> {
    return this.http.get(environment.apiUrl + '/auth/user/me', { withCredentials: true });
  }

  getProposalsForChallenges(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${environment.apiUrl}/proposal`, { withCredentials: true });
  }

  getStartupById(startupId: number): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`${environment.apiUrl}/startup/${startupId}`);
  }


}
