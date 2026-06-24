import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Usuario {
  private apiUrl = environment.apiUsuarios;

  constructor(private http: HttpClient) { }

  comenzarSesionInvitado(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/comenzar`, { id: uuid });
  }

  generarUUID(): string {
    return self.crypto.randomUUID();
  }
}