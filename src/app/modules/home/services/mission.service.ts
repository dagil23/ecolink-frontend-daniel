import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../../../core/models/Mission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private baseUrl: string = environment.apiUrl + '/mission';
  constructor(private http: HttpClient) { }
  getMission(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.baseUrl, { withCredentials: true });
  }
  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.apiUrl}/mission/${mission.id}`, mission, { withCredentials: true });
  }
}
