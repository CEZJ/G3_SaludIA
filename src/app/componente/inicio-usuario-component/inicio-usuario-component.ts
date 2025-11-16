import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
// --- Módulos de Angular Material ---
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  // Importamos todos los módulos de Material que necesita el HTML
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './inicio-usuario-component.html',
  styleUrls: ['./inicio-usuario-component.css']
})
export class InicioUsuarioComponent {

  // Inyectamos el Router para la función de logout
  constructor(private router: Router) {}

  /**
   * Función de ejemplo para cerrar sesión.
   * Limpia el almacenamiento local y redirige al login.
   */
  logout(): void {
    // Lógica de logout (ej. limpiar token)
    localStorage.removeItem('jwt_token');

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }
}
