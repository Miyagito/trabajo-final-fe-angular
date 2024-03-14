import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { Categoria } from '../../models/categoria.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdminFormComponent {
  adminForm: FormGroup;
  @Output() addCategory = new EventEmitter<string>();
  @Output() addProduct = new EventEmitter<{
    producto: Producto;
    categoria: string;
  }>();
  @Input() categories: Categoria[] = [];

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      nombreCategoria: ['', Validators.required],
      categoriaProducto: ['', Validators.required], // Se añade validador 'required' para asegurar una categoría seleccionada
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      codigo: ['', Validators.required],
      imagen: ['', Validators.required],
    });
  }

  onAddCategory(): void {
    if (this.adminForm.value.nombreCategoria) {
      this.addCategory.emit(this.adminForm.value.nombreCategoria);
      this.adminForm.get('nombreCategoria')!.reset();
    }
  }

  onSubmit(): void {
    const newProduct: Producto = {
      descripcion: this.adminForm.value.descripcion,
      precio: this.adminForm.value.precio,
      stock: this.adminForm.value.stock,
      codigo: this.adminForm.value.codigo,
      imagen: this.adminForm.value.imagen,
    };

    if (this.adminForm.value.categoriaProducto) {
      this.addProduct.emit({
        producto: newProduct,
        categoria: this.adminForm.value.categoriaProducto,
      });
      this.adminForm.reset();
    } else {
      console.error('Debe seleccionar una categoría');
    }
  }
}
