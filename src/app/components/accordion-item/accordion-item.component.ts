import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent {
  @Input() category: Categoria | null = null;
  @Input() expanded: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter();
  @Output() addProduct: EventEmitter<Producto> = new EventEmitter();

  toggleExpansion(): void {
    this.toggle.emit();
  }

  addProductToCart(producto: Producto): void {
    this.addProduct.emit(producto);
  }
}
