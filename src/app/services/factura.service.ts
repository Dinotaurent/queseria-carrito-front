import { Factura } from './../models/factura';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_BASE } from '../config/app';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private URL = `${URL_BASE}facturas/`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  facturaId: number;
  facturaIdSubject = new BehaviorSubject<number>(null);
  facturaId$ = this.facturaIdSubject.asObservable();
  facturaEnCurso = false;

  constructor(private http: HttpClient) {}

  public listarXId(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.URL}${id}`);
  }

  public crear(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.URL, factura, {
      headers: this.headers,
    });
  }

  public asignarProducto(
    id: number,
    producto: Producto
  ): Observable<Factura> {
    return this.http.put<Factura>(
      `${this.URL}${id}/asignar-producto`,
      producto,
      {
        headers: this.headers,
      }
    );
  }

  public removerProducto(id: number, producto: Producto): Observable<Factura> {
    return this.http.put<Factura>(
      `${this.URL}${id}/remover-producto`,
      producto,
      {
        headers: this.headers,
      }
    );
  }

  public pagarFactura(id: number): Observable<Factura> {
    return this.http.put<Factura>(`${this.URL}${id}/pagar-factura`, {
      headers: this.headers,
    });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}`);
  }
}
