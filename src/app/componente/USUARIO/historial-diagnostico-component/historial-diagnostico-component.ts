import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-historial-diagnostico-component',
  imports: [
    MatCard,
    MatIcon,
    MatListItem,
    MatNavList,
    MatSidenav,
    RouterLink
  ],
  templateUrl: './historial-diagnostico-component.html',
  styleUrl: './historial-diagnostico-component.css',
})
export class HistorialDiagnosticoComponent {
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
