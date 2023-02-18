import { Producto } from './producto';
export class Factura {
  id!: number;
  total!: number;
  pagada = false;
  createAt!: number;
  productos: Producto[] = [];
}
