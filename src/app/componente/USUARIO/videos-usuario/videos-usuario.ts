import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-videos-usuario',
  imports: [MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatListItem,
    MatNavList,
    MatSidenavModule,
    RouterLink,],
  templateUrl: './videos-usuario.html',
  styleUrl: './videos-usuario.css',
})
export class VideosUsuario {
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
