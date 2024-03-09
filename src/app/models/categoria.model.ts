import { Producto } from './producto.model';

export interface Categoria {
  nombre: string;
  productos: Producto[];
}
