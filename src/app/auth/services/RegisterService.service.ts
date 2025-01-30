import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { type Observable } from "rxjs"
import {environment} from '../../environments/environment';
import {Preference} from '../models/Preference';


@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private baseUrl: string = environment.apiUrl + '/ods';
  constructor(private http: HttpClient) {}

  getAllPreferences(): Observable<Preference[]> {
    return this.http.get<Preference[]>(this.baseUrl);
  }

}

