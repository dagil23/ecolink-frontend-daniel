import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Challenge } from '../models/Challenge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  url: string = 'http://10.100.24.1:8080/api/challenges';
  constructor(private http: HttpClient) { }
  getChallenge(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.url);
  }
}
