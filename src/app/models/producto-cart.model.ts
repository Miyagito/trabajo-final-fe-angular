import { Producto } from './producto.model';

export interface ProductoEnCarrito {
  producto: Producto;
  cantidad: number;
}
