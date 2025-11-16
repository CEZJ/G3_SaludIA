import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ¡IMPORTANTE! Para usar *ngIf
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'; // <-- Módulo completo
import { MatIconModule } from '@angular/material/icon'; // <-- Para el icono de logout
import { UsuarioService } from '../../services/usuario-service'; // <-- 1. Importa el servicio

@Component({
  selector: 'app-nav-bar-component',
  standalone: true, // <-- ¡AÑADIDO!
  imports: [
    CommonModule, // <-- ¡AÑADIDO!
    MatButtonModule, // <-- Módulo completo
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterLinkActive,
    MatIconModule // <-- ¡AÑADIDO!
  ],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
})
export class NavBarComponent {

  // 3. Inyecta el servicio y hazlo PÚBLICO
  // Al hacerlo público, podemos usarlo en el HTML
  public usuarioService = inject(UsuarioService);

  // 4. Añade la función de logout
  logout(): void {
    this.usuarioService.logout();
  }

  // (El CSS que tenías aquí dentro se ha movido al archivo .css)
}
