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

  comenzarSesionInvitado(uuid?: string | null): Observable<any> {
    const body = uuid ? { id: uuid } : {};
    return this.http.post(`${this.apiUrl}/comenzar`, body);
  }

}