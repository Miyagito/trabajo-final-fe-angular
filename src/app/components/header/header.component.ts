import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isAdmin: boolean = false;
  @Output() toggleAdminMode: EventEmitter<boolean> = new EventEmitter();

  error: string = '';
  private adminPassword: string = 'admin';

  handleAdminButtonClick(): void {
    if (this.isAdmin) {
      this.isAdmin = false;
      this.toggleAdminMode.emit(this.isAdmin);
    } else {
      const enteredPassword = window.prompt(
        'Por favor, ingresa el password de admin:'
      );
      if (enteredPassword === this.adminPassword) {
        this.isAdmin = true;
        this.toggleAdminMode.emit(this.isAdmin);
        this.error = '';
      } else {
        this.error = 'Password incorrecto. Acceso denegado.';
      }
    }
  }
}
