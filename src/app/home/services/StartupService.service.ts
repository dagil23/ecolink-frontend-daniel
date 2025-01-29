import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Startup } from '../models/Startup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private url: string = 'http://localhost:8080/api/startup';
  constructor(private http: HttpClient) { }

  getRelevantStartups(): Observable<Startup[]> {
    return this.http.get<Startup[]>(this.url + '/relevant');
  }
}
