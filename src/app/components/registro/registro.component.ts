import { RegistroService } from './../../services/registro.service';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  registros: Registro[] = [];
  titulo = 'Historial de facturas canceladas';

  constructor(private service: RegistroService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((registros) => {
      this.registros = registros;
      this.registros.reverse();
    });
  }
}
