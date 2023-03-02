import { Producto } from './../models/producto';
import { URL_BASE } from './../config/app';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private URL = `${URL_BASE}productos/`;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  public listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL);
  }

  public listarXId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.URL}${id}`);
  }

  public listarXPagina(page: string, size: string): Observable<any> {
    const PARAMS = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.URL}pagina`, { params: PARAMS });
  }

  public buscarXNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.URL}buscar-producto-x-nombre/${nombre}`
    );
  }

  public crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.URL, producto, {
      headers: this.headers,
    });
  }

  public crearConFoto(producto: Producto, archivo: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());

    return this.http.post<Producto>(`${this.URL}crear-con-foto`, formData);
  }

  public editar(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.URL}${producto.id}`, producto, {
      headers: this.headers,
    });
  }

  public editarConFoto(producto: Producto, archivo: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio.toString());

    return this.http.put<Producto>(`${this.URL}actualizar-con-foto/${producto.id}`, formData);
  }

  public agregarDiez(): Observable<void> {
    return this.http.put<void>(`${this.URL}agregar-10`, {
      headers: this.headers,
    });
  }

  public restarCinco(productos: Producto[]): Observable<Producto[]> {
    return this.http.put<Producto[]>(`${this.URL}restar-5`, productos, {
      headers: this.headers,
    });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}${id}`);
  }
}
