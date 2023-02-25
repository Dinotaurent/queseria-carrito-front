import { ProductosService } from './../../services/productos.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/models/producto';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { URL_BASE } from 'src/app/config/app';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent {
  titulo = 'Crear nuevo producto';
  model = new Producto();
  error: any;
  rutaRedirect = '/productos';
  fotoSeleccionada: File;
  URL = `${URL_BASE}productos/`;

  constructor(
    private service: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => params.has('id')),
        map((params) => +params.get('id')),
        switchMap((id) => this.service.listarXId(id))
      )
      .subscribe((model) => {
        this.model = model;
        this.titulo = `Modificar ${this.model.nombre}`;
      });
  }

  crear(): void {
    if (!this.fotoSeleccionada) {
      this.service
        .crear(this.model)
        .pipe(
          tap((model) => {
            this.router.navigate([this.rutaRedirect]);
            Swal.fire(`${model.nombre}`, 'registrado con exito', 'success');
          }),
          catchError((err) => {
            if (err.status === 400) {
              this.error = err.error;
              Swal.fire({
                icon: 'error',
                title: 'Campos incorrectos',
              });
            }
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.service
        .crearConFoto(this.model, this.fotoSeleccionada)
        .pipe(
          tap((model) => {
            this.router.navigate([this.rutaRedirect]);
            Swal.fire(`${model.nombre}`, 'registrado con exito', 'success');
          }),
          catchError((err) => {
            if (err.status === 400) {
              this.error = err.error;
              Swal.fire({
                icon: 'error',
                title: 'Campos incorrectos',
              });
            }
            return of(null);
          })
        )
        .subscribe();
    }
  }

  editar(): void {
    Swal.fire({
      title: 'Seguro que quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.fotoSeleccionada) {
          this.service
            .editar(this.model)
            .pipe(
              tap((model) => {
                this.router.navigate([this.rutaRedirect]);
                Swal.fire('Actualizado', '', 'success');
              }),
              catchError((err) => {
                if (err.status === 400) {
                  this.error = err.error;
                  console.log(this.error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Campos incorrectos',
                  });
                }
                return of(null);
              })
            )
            .subscribe();
        } else {
          this.service
            .editarConFoto(this.model, this.fotoSeleccionada)
            .pipe(
              tap((model) => {
                this.router.navigate([this.rutaRedirect]);
                Swal.fire('Actualizado', '', 'success');
              }),
              catchError((err) => {
                if (err.status === 400) {
                  this.error = err.error;
                  console.log(this.error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Campos incorrectos',
                  });
                }
                return of(null);
              })
            )
            .subscribe();
        }
      } else if (result.isDenied) {
        Swal.fire('No se aplicaron los cambios', '', 'info');
      }
    });
  }

  subirFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      this.fotoSeleccionada = null;
      Swal.fire({
        icon: 'error',
        text: 'Tienes que subir una imagen de algun tipo valido ejemplo: PNG,JPG',
      });
    }
  }
}
