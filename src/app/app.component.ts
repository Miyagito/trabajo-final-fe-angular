import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.services';
import { Categoria } from './models/categoria.model';
import { Producto } from './models/producto.model';
import { CategoriasResponse } from './models/categorias-response.model';
import { HeaderComponent } from './components/header/header.component';
import { CategoryAccordionComponent } from './components/category-accordion/category-accordion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, CategoryAccordionComponent],
})
export class AppComponent implements OnInit {
  categories: Categoria[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCategorias().subscribe(
      (response: CategoriasResponse) => {
        // Usa la interfaz en la respuesta
        console.log('Categorias recibidas:', response);
        this.categories = response.categorias; // Ahora puedes acceder a 'categorias' sin problemas
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  title = 'trabajo_final_angular';
  isAdmin = false;

  handleToggleAdminMode(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }
  handleAddProductToCart(product: Producto): void {
    // Tu código para manejar el evento va aquí.
  }
}
