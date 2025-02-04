import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { LoginRequest } from "../models/loginRequest";
import { LoginResponse } from "../models/loginResponse";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private baseUrl: string = environment.apiUrl + '/auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.baseUrl,
      credentials,
      { withCredentials: true });
  }
}
