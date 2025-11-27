import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

@Component({
  selector: 'app-admin-gestionar-sintomas-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './admin-gestionar-sintomas-component.html',
  styleUrls: ['./admin-gestionar-sintomas-component.css']
})
export class AdminGestionarSintomasComponent implements OnInit {

  // Inyección de dependencias
  private sintomaService = inject(SintomaService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  // Variables de datos
  sintomas: Sintoma[] = [];
  filteredSintomas: Sintoma[] = [];

  // Variable de estado de carga (Añadida para corregir el error en el HTML)
  isLoading: boolean = false;

  // Filtros
  filterId: string = '';
  filterName: string = '';

  // Estadísticas
  totalSintomas: number = 0;

  ngOnInit(): void {
    this.cargarSintomas();
  }

  // --- LÓGICA DE CARGA (Actualizada a tu estilo) ---
  cargarSintomas() {
    this.isLoading = true; // Activar carga
    this.sintomaService.list().subscribe({
      next: (data: Sintoma[]) => {
        console.log("Síntomas cargados:", data);
        this.sintomas = data;
        this.filteredSintomas = data;
        this.totalSintomas = data.length; // Actualizamos el contador para la tarjeta de estadísticas
        this.isLoading = false; // Desactivar carga
        this.applyFilter(); // Re-aplicar filtros si existían
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false; // Desactivar carga en error
        console.error("Error al cargar síntomas:", err);
        this.snackBar.open('Error al conectar con el servidor', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  // --- LÓGICA DE CREACIÓN (CREATE) ---
  abrirDialogo() {
    const dialogRef = this.dialog.open(SintomaDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crearSintoma(result);
      }
    });
  }

  crearSintoma(sintoma: Sintoma) {
    this.isLoading = true; // Activar carga al guardar
    this.sintomaService.insert(sintoma).subscribe({
      next: (nuevo: any) => {
        console.log("Síntoma creado:", nuevo);
        this.snackBar.open(`Síntoma agregado correctamente`, 'Cerrar', { duration: 3000 });
        this.isLoading = false;
        this.cargarSintomas();
      },
      error: (err) => {
        this.isLoading = false; // Desactivar carga en error
        console.error("Error al crear:", err);
        this.snackBar.open('Error al guardar en base de datos', 'Cerrar');
      }
    });
  }

  // --- LÓGICA DE FILTRADO ---
  applyFilter() {
    const termName = this.filterName.toLowerCase().trim();
    const termId = this.filterId.toLowerCase().trim();

    this.filteredSintomas = this.sintomas.filter(s => {
      // Usamos idSintoma
      const idStr = s.idSintoma ? s.idSintoma.toString() : '';

      const matchId = idStr.includes(termId);
      const matchName = s.nombre ? s.nombre.toLowerCase().includes(termName) : false;

      return matchId && matchName;
    });
  }

  // --- LÓGICA DE ELIMINACIÓN ---
  eliminarSintoma(idSintoma: number | undefined) {
    if (!idSintoma) {
      this.snackBar.open('Error: ID no válido', 'Cerrar');
      return;
    }

    if(confirm('¿Estás seguro de eliminar este síntoma?')) {
      this.isLoading = true; // Opcional: mostrar carga al eliminar
      this.sintomaService.delete(idSintoma).subscribe({
        next: () => {
          this.snackBar.open('Síntoma eliminado', 'Cerrar', { duration: 3000 });
          this.cargarSintomas(); // cargarSintomas ya maneja su propio isLoading
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          this.snackBar.open('No se pudo eliminar (Puede estar en uso)', 'Cerrar');
        }
      });
    }
  }
}
