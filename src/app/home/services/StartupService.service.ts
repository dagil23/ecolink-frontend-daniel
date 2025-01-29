import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Startup } from '../models/Startup';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private baseUrl: string = environment.apiUrl + '/startup';
  constructor(private http: HttpClient) { }

  getRelevantStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.baseUrl + '/relevant');
  }
}
