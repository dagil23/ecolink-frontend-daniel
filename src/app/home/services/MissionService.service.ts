import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../models/Mission';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private baseUrl: string = environment.apiUrl + '/missions';
  constructor(private http: HttpClient) { }
  getMission(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.baseUrl);
  }
  // updateMission(mission: Mission): Observable<Mission> {
  //   return this.http.put<Mission>(`${environment.apiUrl}/${mission.id}`, mission);
  // }
}
