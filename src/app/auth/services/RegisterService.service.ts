import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    // Simulamos una llamada a API con un delay
    // En un escenario real, aquí harías una llamada HTTP a tu backend
    return of({ success: true, message: "Registro exitoso" }).pipe(delay(1000))
  }
}

