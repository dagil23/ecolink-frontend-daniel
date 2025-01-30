import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Startup } from '../home/models/Startup';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private baseUrl: string = environment.apiUrl + '/startup';
  constructor(private http: HttpClient) { }

  getRelevantStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.baseUrl + '/relevant');
  }

  getStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.baseUrl);
  }

  findStartupById(id: number): void {


  }
}
