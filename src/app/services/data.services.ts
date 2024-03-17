import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataUrl = 'assets/data/categorias.json';
  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  private productos: Producto[] = [];
  categorias$ = this.categoriasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<{ categorias: Categoria[] }>(this.dataUrl).subscribe(
      (response) => this.categoriasSubject.next(response.categorias),
      (err) => console.error('Error loading initial data', err)
    );
  }

  private findProductByCodigo(codigo: string): Producto | undefined {
    return this.productos.find((producto) => producto.codigo === codigo);
  }

  updateProductStock(codigo: string, delta: number) {
    const producto = this.findProductByCodigo(codigo);
    if (producto) {
      producto.stock += delta;
    }
  }

  getCategorias() {
    return this.categorias$;
  }

  addCategoria(nombre: string): void {
    const nuevaCategoria: Categoria = { nombre, productos: [] };
    const categorias = this.categoriasSubject.getValue();
    this.categoriasSubject.next([...categorias, nuevaCategoria]);
  }

  addProducto(categoriaNombre: string, producto: Producto): void {
    const categorias = this.categoriasSubject.getValue();
    const categoriaIndex = categorias.findIndex(
      (c) => c.nombre === categoriaNombre
    );
    if (categoriaIndex > -1) {
      const categoria = categorias[categoriaIndex];
      categoria.productos.push(producto);
      this.categoriasSubject.next(categorias);
    }
  }
}
