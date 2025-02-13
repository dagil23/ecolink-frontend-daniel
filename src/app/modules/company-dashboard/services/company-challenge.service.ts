import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChallengeCompany } from '../../../core/models/ChallengeCompany';
import { Ods } from '../../../core/models/Ods';
import { Challenge } from '../../../core/models/Challenges';

@Injectable({
  providedIn: 'root'
})
export class CompanyChallengeService {

  private baseUrl: string = environment.apiUrl + '/challenge';

  constructor(private http: HttpClient) {}

  getOdsList(): Observable<Ods[]> {
    return this.http.get<Ods[]>(`${environment.apiUrl}/ods`);
  }

  getCompanyChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.baseUrl}/company`, { withCredentials: true });
  }

  getChallengeById(id: string): Observable<ChallengeCompany> {
    return this.http.get<ChallengeCompany>(`${this.baseUrl}/${id}`);
  }

  createChallenge(challenge: ChallengeCompany): Observable<ChallengeCompany> {
    console.log(challenge);
    return this.http.post<ChallengeCompany>(this.baseUrl, challenge, { withCredentials: true });
  }

  // updateChallenge(challenge: ChallengeCompany): Observable<ChallengeCompany> {
  //   return this.http.put<ChallengeCompany>(`${this.baseUrl}/${challenge.id}`, challenge);
  // }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
}
