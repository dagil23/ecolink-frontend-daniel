import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ods } from '../models/Ods';

@Injectable({
  providedIn: 'root'
})
export class OdsService {
  private baseUrl: string = environment.apiUrl + '/ods';

  constructor(private http: HttpClient) { }

  getOds(): Observable<Ods[]> {
    return this.http.get<Ods[]>(this.baseUrl);
  }
}
