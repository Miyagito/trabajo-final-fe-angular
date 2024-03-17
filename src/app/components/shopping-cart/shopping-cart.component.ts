import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductoEnCarrito } from '../../models/producto-cart.model';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  carrito: Record<string, ProductoEnCarrito> = {};

  constructor(private cdr: ChangeDetectorRef) {}

  private updateCarrito() {
    this.carrito = { ...this.carrito };
    this.cdr.detectChanges();
  }

  addProductToCart(producto: Producto): void {
    if (producto.stock > 0) {
      if (this.carrito[producto.codigo]) {
        this.carrito[producto.codigo].cantidad++;
      } else {
        this.carrito[producto.codigo] = { producto, cantidad: 1 };
      }
      producto.stock--;
      this.updateCarrito();
    } else {
      alert('stock insuficiente');
    }
  }

  deleteProductfromCart(codigo: string): void {
    const productoEnCarrito = this.carrito[codigo];
    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad--;
      productoEnCarrito.producto.stock++;
    } else {
      if (productoEnCarrito) {
        productoEnCarrito.producto.stock += productoEnCarrito.cantidad;
      }
      delete this.carrito[codigo];
    }
    this.updateCarrito();
  }

  realizarCompra(): void {
    alert('La compra se ha completado con éxito.');
    this.carrito = {};
    this.cdr.detectChanges();
  }

  get productosCarrito(): Array<ProductoEnCarrito> {
    return Object.values(this.carrito);
  }

  get totalCompra(): number {
    return Object.values(this.carrito).reduce(
      (total, { producto, cantidad }) => {
        return total + producto.precio * cantidad;
      },
      0
    );
  }
}
