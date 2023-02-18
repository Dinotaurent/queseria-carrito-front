import { Factura } from './factura';
export class Registro {
  id!: string;
  valorTotal!: number;
  facturas: Factura[] = [];
  createAt!: number;
}
