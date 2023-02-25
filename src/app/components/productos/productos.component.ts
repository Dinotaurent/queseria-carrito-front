import { Producto } from './../../models/producto';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { URL_BASE } from 'src/app/config/app';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit{
  URL = `${URL_BASE}productos/`;
  titulo = "Lista de productos"
  productos: Producto[] = [];
  datosFiltrados: Producto[] = [];
  listaFiltrada: Producto[] = [];
  totalRegistros = 0;
  paginaActual = 0;
  totalXPagina = 8;
  pageSizeOptions: number[] = [4, 8, 16, 32, 100];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private service: ProductosService){
  }
  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalXPagina = event.pageSize;
    this.calcularRangos();
  }

  calcularRangos() {
    this.service
      .listarXPagina(this.paginaActual.toString(), this.totalXPagina.toString())
      .subscribe((p) => {
        this.productos = p.content as Producto[];
        this.listaFiltrada = this.productos;
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
      });
  }


  filtrar(event: any): void {
    let nombre: string = (<HTMLInputElement>event.target).value;
    nombre = nombre !== undefined ? nombre.trim() : '';

    if (nombre !== '') {
      this.listaFiltrada = [];
      this.service.buscarXNombre(nombre).subscribe(
        (datos) =>{
          (this.datosFiltrados = datos.filter((dato) => {
            let filtrado = true;
            this.productos.forEach((dl) => {

              if (dato.id === dl.id) {
                filtrado = false;
                this.listaFiltrada.push(dl);
              }
            });
            return filtrado;
          }))
          this.totalRegistros = this.listaFiltrada.length;
        }
      );
    } else {
      this.calcularRangos();
    }
  }

  eliminar(producto: Producto): void {
    Swal.fire({
      title: `Estas seguro de eliminar ?`,
      text: 'Esto no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(producto.id).subscribe(() => {
          this.calcularRangos();
        });
        Swal.fire('Eliminado!', `${producto.nombre} fue borrado`, 'success');
      }
    });
  }

}
