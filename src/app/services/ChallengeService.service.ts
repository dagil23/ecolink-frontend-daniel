import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Challenge } from '../home/models/Challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl: string = environment.apiUrl + '/challenges';
  constructor(private http: HttpClient) { }
  getChallenge(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.baseUrl);
  }
}
