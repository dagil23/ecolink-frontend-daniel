import { Injectable } from '@angular/core';
import {Mission} from '../../core/models/Mission';
import {HttpClient} from '@angular/common/http';
import type {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminMissionService {
  private missionUrl = `${environment.apiUrl}/mission`;

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.missionUrl);
  }

  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.missionUrl, mission);
  }


  updateMission(mission:Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.missionUrl}/${mission.id}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.missionUrl}/${id}`);
  }
}
