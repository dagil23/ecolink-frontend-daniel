import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ods } from '../../../core/models/Ods';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any[]> {
    return this.http.get<any[]>(this.profileUrl, { withCredentials: true });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(environment.apiUrl + '/auth/user/me', { withCredentials: true });
  }

  getOds(): Observable<Ods[]> {
    return this.http.get<Ods[]>(environment.apiUrl + '/ods', { withCredentials: true });
  }

  updateProfile(data: { odsIdList: number[]; description: string }, image?: File) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    console.log('Data adjuntada:', formData.get('data'));

    if (image) {
      formData.append('image', image);
      console.log('Imagen adjuntada:', formData.get('image'));
    }

    return this.http.put(this.profileUrl + '/update', formData, { withCredentials: true });
  }

}
