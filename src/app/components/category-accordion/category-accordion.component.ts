import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-accordion',
  templateUrl: './category-accordion.component.html',
  styleUrls: ['./category-accordion.component.css'],
  standalone: true,
  imports: [AccordionItemComponent, CommonModule],
})
export class CategoryAccordionComponent {
  @Input() categories: Categoria[] = [];
  @Output() addProductToCart: EventEmitter<Producto> = new EventEmitter();

  expandedIndex: number | null = null;

  handleToggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
