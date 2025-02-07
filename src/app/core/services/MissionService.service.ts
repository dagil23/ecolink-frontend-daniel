import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mission } from '../models/Mission';

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
    return this.http.put<Mission>(`${environment.apiUrl}/mission/${mission.id}`, { withCredentials: true });
  }
}
