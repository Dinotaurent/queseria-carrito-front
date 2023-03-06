import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../config/app';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private URL = `${URL_BASE}registros/`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // registroIdSubject = new BehaviorSubject<number>(null);
  // registroId$ = this.registroIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  public listar(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.URL);
  }

  public crear(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.URL, registro, {
      headers: this.headers,
    });
  }

  public eliminar(id: string): Observable<void>{
    return this.http.delete<void>(`${this.URL}${id}`);
  }
}
