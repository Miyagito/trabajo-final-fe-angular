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
        this.categories = response.categorias;
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
  handleAddProductToCart(product: Producto): void {}
}
