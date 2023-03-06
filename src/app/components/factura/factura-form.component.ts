import { Producto } from 'src/app/models/producto';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from './../../models/factura';
import { Component } from '@angular/core';
import { URL_BASE } from 'src/app/config/app';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent {
  model = new Factura();
  error: any;
  rutaRedirect = '/inicio';
  productosRegistrados: Producto[];
  mostrarColumnasRegistrados = ['nombre', 'precio', 'eliminar'];
  dataSource: MatTableDataSource<Producto>;

  constructor(
    private service: FacturaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service.listarXId(id).subscribe((model) => {
          this.model = model;
          this.productosRegistrados = model.productos;
          this.iniciarPaginador();
        });
      }
    });
  }

  iniciarPaginador(): void {
    this.dataSource = new MatTableDataSource<Producto>(
      this.productosRegistrados
    );
  }

  remover(producto: Producto): void {
    this.service
      .removerProducto(this.model.id, producto)
      .subscribe((factura) => {
        this.model.total = factura.total;
        this.refrescarProductos();
        Swal.fire(
          'Removido!',
          `${producto.nombre} fue eliminado del la factura`,
          'success'
        );
      });
  }

  refrescarProductos() {
    this.service.listarXId(this.model.id).subscribe((factura) => {
      this.productosRegistrados = factura.productos;
      this.iniciarPaginador();
    });
  }

  pagarFactura(id: number) {
    Swal.fire({
      title: 'Estas seguro de pagar esta factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, pagar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Pagada!', `La factura #${this.model.id} fue pagada y archivada`, 'success');
        this.service.pagarFactura(id).subscribe(() => {
          this.service.facturaEnCurso = false;
          this.router.navigate([this.rutaRedirect]);
        });
      }
    });
  }
}
