import { Injectable } from '@angular/core';
import {Startup} from '../../core/models/Startup';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StartupVerificationService {

  constructor(private http: HttpClient) { }

}
