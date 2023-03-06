import { RegistroService } from './../../services/registro.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FacturaService } from 'src/app/services/factura.service';
import { Registro } from 'src/app/models/registro';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  facturaId: number;
  registroBd = new Registro();
  hoy = new Date();
  facturaEnCurso: boolean;
  constructor(
    private facturaService: FacturaService,
    private registroSevice: RegistroService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.facturaService.facturaId$
      .pipe(
        tap((facturaId) => {
          this.facturaId = facturaId;
          this.facturaEnCurso = this.facturaService.facturaEnCurso;
        })
      )
      .subscribe();

    this.registroSevice.listar().subscribe((registros) => {
      const hoyF = this.datePipe.transform(this.hoy, 'dd/MM/yyyy');
      const registroBd = registros.find(
        (registro) =>
          this.datePipe.transform(registro.createAt, 'dd/MM/yyyy') === hoyF
      );
      if (registroBd) {
        this.registroSevice.eliminar(registroBd.id).subscribe(() => {
          this.crearNuevoRegistro();
        });
      } else {
        this.crearNuevoRegistro();
      }
    });
  }

  crearNuevoRegistro() {
    this.registroSevice.crear(this.registroBd).subscribe(() => {
    });
  }
}
