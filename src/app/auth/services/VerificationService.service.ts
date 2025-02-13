import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private verifyUrl = `${environment.apiUrl}/verify`;

  constructor(private http: HttpClient) {}

  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(this.verifyUrl, { email, code });
  }
}
