import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTableModule // Añadido para agrupar las directivas de tabla, aunque la lista individual funciona.
} from '@angular/material/table';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {Ubicacion} from '../../../model/ubicacion';
import {UbicacionService} from '../../../services/ubicacion-service';
import {Router, RouterLink} from '@angular/router';

// IMPORTS CORREGIDOS: Debes importar el MÓDULO, no la directiva individual.
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Agregado para DatePipe si lo usaras
import { MatInputModule } from '@angular/material/input'; // Útil si añades filtros/inputs
import { MatButtonModule } from '@angular/material/button';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav'; // Útil si añades botones

@Component({
  selector: 'app-ubicacion-listar-component',
  standalone: true, // Asumo que es standalone ya que usa el array 'imports'
  imports: [
    // Módulos correctos de Angular Material
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule, // Usado para el contenedor de la tabla
    MatIconModule,  // Usado para MatIcon
    MatInputModule,
    MatButtonModule,

    // Módulo de Angular
    CommonModule,
    MatListItem,
    MatNavList,
    MatSidenav,
    RouterLink,
    // Si usas DatePipe, descomentar la línea de abajo y comentar la de arriba
    // DatePipe, // <- Si lo usas como pipe en el template, debe ir aquí o en CommonModule

    // Si quieres usar las directivas individualmente (solo si no usas los Módulos de arriba):
    // MatTable, MatSort, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell,
    // MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator,
    // MatSortHeader, MatCard, MatIcon
  ],
  templateUrl: './ubicacion-listar-component.html',
  styleUrl: './ubicacion-listar-component.css',
})
export class UbicacionListarComponent {
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
