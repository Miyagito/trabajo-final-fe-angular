import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.services';
import { Categoria } from './models/categoria.model';
import { Producto } from './models/producto.model';
import { HeaderComponent } from './components/header/header.component';
import { CategoryAccordionComponent } from './components/category-accordion/category-accordion.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    CategoryAccordionComponent,
    AdminFormComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  categories: Categoria[] = [];
  selectedCategory: string | null = null;
  isAdmin: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.categorias$.subscribe(
      (categorias) => {
        this.categories = categorias;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  handleAddCategory(nombreCategoria: string): void {
    this.dataService.addCategoria(nombreCategoria);
    this.dataService.getCategorias().subscribe((categorias) => {
      this.categories = categorias;
    });
  }

  handleAddProduct(data: { producto: Producto; categoria: string }): void {
    this.dataService.addProducto(data.categoria, data.producto);
  }

  handleAddProductToCart(producto: Producto): void {}

  toggleAdminMode(): void {
    this.isAdmin = !this.isAdmin;
  }
}
