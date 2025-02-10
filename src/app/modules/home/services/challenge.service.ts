import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Challenge } from '../../../core/models/Challenges';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl: string = environment.apiUrl + '/challenge';
  
  constructor(private http: HttpClient) { }

  getRelevantChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.baseUrl + '/relevant');
  }
}
