import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

// Servicios y Modelos
import { EnfermedadService } from '../../../services/enfermedad-service';
import { Enfermedad } from '../../../model/enfermedad';

// Importamos el Diálogo (Asegúrate que esta ruta sea correcta según tu estructura)
// Generalmente está en una carpeta compartida 'components' o al mismo nivel
import { EnfermedadDialogComponent } from './enfermedad-dialog.component/enfermedad-dialog.component';


@Component({
  selector: 'app-admin-gestionar-enfermedades-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './admin-gestionar-enfermedades-component.html',
  styleUrls: ['./admin-gestionar-enfermedades-component.css']
})
export class AdminGestionarEnfermedadesComponent implements OnInit {

  // Inyección de dependencias
  private enfermedadService = inject(EnfermedadService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Lista de datos reales del backend
  enfermedades: Enfermedad[] = [];

  // Lista decorada para la vista (agrega colores, iconos, conteo de síntomas)
  enfermedadesVisuales: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarEnfermedades();
  }

  // --- READ: Cargar lista ---
  cargarEnfermedades() {
    this.enfermedadService.list().subscribe({
      next: (data) => {
        this.enfermedades = data;
        console.log("Enfermedades cargadas:", data);

        // Transformamos los datos planos en datos visuales para las tarjetas
        this.enfermedadesVisuales = data.map(enf => {
          // Robustez: Usar idEnfermedad o id
          const idReal = enf.idEnfermedad || enf.id || 0;

          return {
            ...enf,
            idEnfermedad: idReal, // Normalizamos el ID para la vista
            color: this.getColor(idReal),
            icon: 'medical_services',
            estado: 'Registro Activo',
            // Calculamos cuántos síntomas tiene asociados para mostrarlo
            sintomasTexto: enf.sintomasIds && enf.sintomasIds.length > 0
              ? `${enf.sintomasIds.length} síntomas asociados`
              : 'Sin síntomas registrados'
          };
        });
      },
      error: (err) => {
        console.error("Error al cargar enfermedades:", err);
        this.snackBar.open('Error al conectar con el servidor', 'Cerrar', { panelClass: ['snackbar-error'] });
      }
    });
  }

  // --- CREATE / UPDATE: Abrir Modal ---
  abrirDialogo(enfermedad?: Enfermedad) {
    const dialogRef = this.dialog.open(EnfermedadDialogComponent, {
      width: '500px',
      disableClose: true, // Evita cerrar por accidente
      data: enfermedad // Si es null = Crear, Si tiene datos = Editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Datos del diálogo:", result);

        // Si tiene ID, es una actualización
        if (result.idEnfermedad || result.id) {
          this.actualizarEnfermedad(result);
        } else {
          this.crearEnfermedad(result);
        }
      }
    });
  }

  crearEnfermedad(enf: Enfermedad) {
    this.enfermedadService.insert(enf).subscribe({
      next: (nueva) => {
        console.log("Creada:", nueva);
        this.snackBar.open('Enfermedad registrada con éxito', 'Cerrar', { duration: 3000 });
        this.cargarEnfermedades(); // Recargar la lista visual
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al registrar enfermedad', 'Cerrar');
      }
    });
  }

  actualizarEnfermedad(enf: Enfermedad) {
    this.enfermedadService.update(enf).subscribe({
      next: (actualizada) => {
        console.log("Actualizada:", actualizada);
        this.snackBar.open('Enfermedad actualizada correctamente', 'Cerrar', { duration: 3000 });
        this.cargarEnfermedades();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al actualizar enfermedad', 'Cerrar');
      }
    });
  }

  // --- DELETE: Eliminar ---
  eliminarEnfermedad(id: number) {
    if (!id) return;

    if(confirm('¿Eliminar esta enfermedad y sus relaciones con síntomas?')) {
      this.enfermedadService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarEnfermedades();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('No se pudo eliminar (Verificar dependencias)', 'Cerrar');
        }
      });
    }
  }

  // Utilidad visual: Asignar un color basado en el ID para que no se vea monótono
  getColor(id: number): string {
    const colors = ['blue', 'red', 'green', 'purple', 'orange', 'teal'];
    // Usamos el módulo para ciclar los colores
    return colors[id % colors.length];
  }
}
