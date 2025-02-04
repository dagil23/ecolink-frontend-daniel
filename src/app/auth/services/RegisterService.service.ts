import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { type Observable } from "rxjs"
import {environment} from '../../environments/environment';
import {Preference} from '../models/Preference';


@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private registerUrl = `${environment.apiUrl}/user/register`;
  private preferencesUrl = `${environment.apiUrl}/ods`;
  constructor(private http: HttpClient) {}

  getAllPreferences(): Observable<Preference[]> {
    return this.http.get<Preference[]>(this.preferencesUrl);
  }

  addUser(userData: FormData): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

}

