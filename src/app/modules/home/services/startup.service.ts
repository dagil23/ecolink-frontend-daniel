import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Startup } from '../../../core/models/Startup';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private baseUrl: string = environment.apiUrl + '/startup';
  constructor(private http: HttpClient) { }

  getRelevantStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.baseUrl + '/home');
  }
}
