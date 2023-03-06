import { Factura } from './../../models/factura';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  facturaId: number;
  facturaEnCurso: boolean;
  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.facturaService.facturaId$
      .pipe(
        tap((facturaId) => {
          this.facturaId = facturaId;
          this.facturaEnCurso = this.facturaService.facturaEnCurso;
        })
      )
      .subscribe();
  }
}
