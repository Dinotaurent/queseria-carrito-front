import { Producto } from 'src/app/models/producto';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from './../../models/factura';
import { Component } from '@angular/core';
import { URL_BASE } from 'src/app/config/app';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-factura-form',
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent {
  model = new Factura();
  error: any;
  rutaRedirect = '/productos';
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
          this.model = model
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
}
