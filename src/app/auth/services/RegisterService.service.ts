import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { type Observable } from "rxjs"
import {environment} from '../../environments/environment';
import {Preference} from '../models/Preference';
import {map, shareReplay} from 'rxjs/operators'


export interface Country {
  code?: string,
  name: string
}

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private registerUrl = `${environment.apiUrl}/auth/register`;
  private preferencesUrl = `${environment.apiUrl}/ods`;
  private countriesUrl = 'assets/country.json'
  constructor(private http: HttpClient) {}

  getAllPreferences(): Observable<Preference[]> {
    return this.http.get<Preference[]>(this.preferencesUrl);
  }

  addUser(userData: FormData): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  getContries():Observable<Country []>{

    return this.http.get<Record<string, string>>(this.countriesUrl).pipe(
      map(obj =>
        Object.entries(obj).map(([code, name]) => ({ code, name }))
      ),
      shareReplay(1)               // solo 1 descarga, cacheada
    );
  }
  
}

