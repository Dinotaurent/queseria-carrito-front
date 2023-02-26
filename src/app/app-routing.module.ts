import { FacturaFormComponent } from './components/factura/factura-form.component';
import { ProductoFormComponent } from './components/productos/producto-form.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/form', component: ProductoFormComponent },
  { path: 'productos/form/:id', component: ProductoFormComponent },
  { path: 'facturas/form', component: FacturaFormComponent },
  { path: 'facturas/form/:id', component: FacturaFormComponent },
  { path: 'registros', component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
