import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Challenge } from '../models/Challenge';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
