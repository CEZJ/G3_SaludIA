import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Importa tus archivos creados arriba (Ajusta los ../ si es necesario)
import { SintomaService } from '../../../services/sintoma-service';
import { Sintoma } from '../../../model/sintoma';
import { SintomaDialogComponent } from './sintoma-dialog.component/sintoma-dialog.component';

import { HttpErrorResponse } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-gestionar-sintomas-component',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule,
    MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule
  ],
  templateUrl: './admin-gestionar-sintomas-component.html',
  styleUrls: ['./admin-gestionar-sintomas-component.css']
})
export class AdminGestionarSintomasComponent implements OnInit {

  private sintomaService = inject(SintomaService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  sintomas: Sintoma[] = [];
  filteredSintomas: Sintoma[] = [];
  isLoading: boolean = false;
  filterId: string = '';
  filterName: string = '';
  totalSintomas: number = 0;

  ngOnInit(): void {
    this.cargarSintomas();
  }

  // --- MANEJO DE ERRORES ROBUSTO ---
  private manejarError(err: HttpErrorResponse) {
    this.isLoading = false;
    console.error("Error detectado (Status " + err.status + "):", err);

    // 1. ERRORES DE INTEGRIDAD DE DATOS (No cerrar sesión)
    // 500: Error interno (común en FK violation)
    // 409: Conflicto
    // 400: Bad Request
    if (err.status === 500 || err.status === 409 || err.status === 400) {
      this.snackBar.open('⚠️ No se puede eliminar: El síntoma está siendo usado en una Enfermedad o Diagnóstico.', 'Cerrar', {
        duration: 6000,
        panelClass: ['snackbar-warning']
      });
    }
    // 2. ERRORES DE SESIÓN (Token inválido/expirado real)
    else if (err.status === 401) {
      this.snackBar.open('🔒 Sesión expirada. Por favor inicia sesión.', 'Cerrar', { duration: 4000 });
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
      // 3. ERRORES DE PERMISOS (403)
    // Si podemos listar pero no borrar, es falta de permisos, no token vencido. No cerramos sesión.
    else if (err.status === 403) {
      this.snackBar.open('⛔ No tienes permiso para realizar esta acción.', 'Cerrar', { duration: 4000 });
    }
    // 4. OTROS
    else if (err.status === 0) {
      this.snackBar.open('❌ Error de conexión con el servidor.', 'Cerrar');
    } else {
      this.snackBar.open(`Error inesperado (${err.status}): ${err.message}`, 'Cerrar');
    }
  }

  // --- CARGAR ---
  cargarSintomas() {
    this.isLoading = true;
    this.sintomaService.list().subscribe({
      next: (data: any[]) => {
        this.isLoading = false;
        // Normalizamos ID
        this.sintomas = data.map(item => ({
          ...item,
          id: item.id || item.idSintoma,
          idSintoma: item.idSintoma || item.id
        }));
        this.filteredSintomas = this.sintomas;
        this.totalSintomas = this.sintomas.length;
        this.applyFilter();
      },
      error: (err) => {
        // Si falla al cargar la lista, ahí sí podría ser token vencido (403)
        if (err.status === 403) {
          this.snackBar.open('🔒 Sesión expirada.', 'Cerrar');
          this.router.navigate(['/login']);
        } else {
          this.manejarError(err);
        }
      }
    });
  }

  // --- ABRIR DIÁLOGO (CREAR O EDITAR) ---
  abrirDialogo(sintoma?: Sintoma) {
    const dialogRef = this.dialog.open(SintomaDialogComponent, {
      width: '400px',
      disableClose: true,
      data: sintoma // Pasamos el objeto si es edición, o undefined si es nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el objeto tiene un ID, es una actualización
        if (result.id || result.idSintoma) {
          this.actualizarSintoma(result);
        } else {
          this.crearSintoma(result);
        }
      }
    });
  }

  // --- ACCIONES CRUD ---

  crearSintoma(sintoma: Sintoma) {
    this.isLoading = true;
    this.sintomaService.insert(sintoma).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Síntoma agregado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarSintomas();
      },
      error: (err) => this.manejarError(err)
    });
  }

  actualizarSintoma(sintoma: Sintoma) {
    this.isLoading = true;
    this.sintomaService.update(sintoma).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Síntoma actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.cargarSintomas();
      },
      error: (err) => this.manejarError(err)
    });
  }

  eliminarSintoma(id: number | undefined) {
    if (!id) {
      this.snackBar.open('Error: ID inválido', 'Cerrar');
      return;
    }

    if(confirm('¿Estás seguro de eliminar este síntoma?')) {
      this.isLoading = true;
      this.sintomaService.delete(id).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Síntoma eliminado', 'Cerrar', { duration: 3000 });
          this.cargarSintomas();
        },
        error: (err) => this.manejarError(err)
      });
    }
  }

  // --- FILTROS ---
  applyFilter() {
    const termName = this.filterName.toLowerCase().trim();
    const termId = this.filterId.toLowerCase().trim();

    this.filteredSintomas = this.sintomas.filter(s => {
      const idVal = s.id || s.idSintoma;
      const idStr = idVal ? idVal.toString() : '';
      const matchId = idStr.includes(termId);
      const matchName = s.nombre ? s.nombre.toLowerCase().includes(termName) : false;
      return matchId && matchName;
    });
  }
}
