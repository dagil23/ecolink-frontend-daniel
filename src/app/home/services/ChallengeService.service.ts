import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Challenge } from '../models/Challenge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeServiceService {
  url: string = 'http://localhost:8080/api/chalenges';
  constructor(private http: HttpClient) { }
  getChallenge(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url);
  }
}
