import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicio y Modelo
import { SintomaService } from '../../../services/sintoma-service'; // Ajusta la ruta
import { Sintoma } from '../../../model/sintoma'; // Tu modelo
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
    MatSnackBarModule
  ],
  templateUrl: './admin-gestionar-sintomas-component.html',
  styleUrls: ['./admin-gestionar-sintomas-component.css']
})
export class AdminGestionarSintomasComponent implements OnInit {

  private sintomaService = inject(SintomaService);
  private snackBar = inject(MatSnackBar);

  // Datos
  sintomas: Sintoma[] = [];
  filteredSintomas: Sintoma[] = [];

  // Filtros
  filterId: string = '';
  filterName: string = '';

  // Estadísticas Simples
  totalSintomas: number = 0;
  casosSeveros: number = 0; // No podemos calcular esto sin datos
  masFrecuente: string = '-'; // No podemos calcular esto sin datos
  totalCategorias: number = 0; // No podemos calcular esto sin datos

  constructor() {}

  ngOnInit(): void {
    this.cargarSintomas();
  }

  cargarSintomas() {
    this.sintomaService.list().subscribe({
      next: (data: Sintoma[]) => {
        this.sintomas = data;
        this.filteredSintomas = data;
        this.calcularEstadisticas();
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error:", err);
        this.snackBar.open('Error al cargar síntomas', 'Cerrar', {
          duration: 5000, panelClass: ['snackbar-error']
        });
      }
    });
  }

  calcularEstadisticas() {
    if (this.sintomas.length === 0) return;
    this.totalSintomas = this.sintomas.length;
    // Como tu modelo solo tiene ID y Nombre, no podemos calcular lo demás
    // Se quedarán en 0 o '-'
  }

  applyFilter() {
    const termName = this.filterName.toLowerCase().trim();
    const termId = this.filterId.toLowerCase().trim();

    this.filteredSintomas = this.sintomas.filter(s => {
      const matchId = s.idSintoma.toString().includes(termId);
      const matchName = s.nombre.toLowerCase().includes(termName);
      return matchId && matchName;
    });
  }

  eliminarSintoma(id: number) {
    if(confirm('¿Estás seguro de eliminar este síntoma?')) {
      this.sintomaService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Síntoma eliminado', 'Cerrar', { duration: 3000 });
          this.cargarSintomas(); // Recargar la lista
        },
        error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { panelClass: ['snackbar-error'] })
      });
    }
  }
}
