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
import { Sintoma } from '../../../model/sintoma';

// Diálogo
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

  private enfermedadService = inject(EnfermedadService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  enfermedades: Enfermedad[] = [];
  enfermedadesVisuales: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cargarEnfermedades();
  }

  // --- READ: Cargar lista ---
  cargarEnfermedades() {
    this.enfermedadService.list().subscribe({
      next: (data) => {
        console.log("Datos del backend:", data);

        this.enfermedades = data;

        // Preparar vista
        this.enfermedadesVisuales = this.enfermedades.map(enf => {
          const idReal = enf.id || enf.idEnfermedad || 0;

          // Detectar si vienen IDs en 'idsSintomas' (DTO) o objetos en 'sintomas' (Entidad)
          let cantidad = 0;

          if (enf.idsSintomas && enf.idsSintomas.length > 0) {
            cantidad = enf.idsSintomas.length;
          }
          else if (enf.sintomas && enf.sintomas.length > 0) {
            cantidad = enf.sintomas.length;
          }

          return {
            ...enf,
            idEnfermedad: idReal,
            color: this.getColor(idReal),
            icon: 'medical_services',
            estado: 'Registro Activo',
            sintomasTexto: cantidad > 0 ? `${cantidad} síntomas asociados` : 'Sin síntomas registrados'
          };
        });
      },
      error: (err) => {
        console.error("Error al cargar:", err);
        this.snackBar.open('Error al conectar con el servidor', 'Cerrar', { panelClass: ['snackbar-error'] });
      }
    });
  }

  // --- ABRIR DIÁLOGO ---
  abrirDialogo(enfermedad?: Enfermedad) {
    let datosParaDialogo = null;

    if (enfermedad) {
      let idsParaEdicion: number[] = [];

      // Intentamos recuperar los IDs existentes para marcar las casillas
      if (enfermedad.idsSintomas) {
        idsParaEdicion = enfermedad.idsSintomas;
      } else if (enfermedad.sintomas) {
        idsParaEdicion = enfermedad.sintomas.map((s: any) => s.id || s.idSintoma);
      }

      datosParaDialogo = {
        ...enfermedad,
        sintomasIds: idsParaEdicion
      };
    }

    const dialogRef = this.dialog.open(EnfermedadDialogComponent, {
      width: '500px',
      disableClose: true,
      data: datosParaDialogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id || result.idEnfermedad) {
          this.actualizarEnfermedad(result);
        } else {
          this.crearEnfermedad(result);
        }
      }
    });
  }

  // --- CREAR (Usa DTO -> idsSintomas) ---
  crearEnfermedad(formValue: any) {
    const payload = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      // DTO requiere 'idsSintomas' (lista de números)
      idsSintomas: formValue.sintomasIds ? formValue.sintomasIds.map((i: any) => Number(i)) : []
    };

    console.log("Payload CREAR (DTO):", payload);

    this.enfermedadService.insert(payload as any).subscribe({
      next: () => {
        this.snackBar.open('Enfermedad registrada', 'Cerrar', { duration: 3000 });
        this.cargarEnfermedades();
      },
      error: (err) => {
        console.error("Error backend:", err);
        this.snackBar.open('Error al registrar', 'Cerrar');
      }
    });
  }

  // --- ACTUALIZAR (Usa Entidad -> sintomas: [{id: 1}]) ---
  actualizarEnfermedad(formValue: any) {
    const idsNumeros = formValue.sintomasIds ? formValue.sintomasIds.map((i: any) => Number(i)) : [];

    const payload = {
      id: formValue.idEnfermedad || formValue.id,
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,

      // CAMBIO CLAVE: Para actualizar, usamos la Entidad, que espera objetos en 'sintomas'
      // No usamos 'idsSintomas' aquí porque la Entidad Java lo ignoraría.
      sintomas: idsNumeros.map((id: number) => ({ id: id }))
    };

    console.log("Payload ACTUALIZAR (Entidad):", payload);

    this.enfermedadService.update(payload as any).subscribe({
      next: () => {
        this.snackBar.open('Enfermedad actualizada', 'Cerrar', { duration: 3000 });
        this.cargarEnfermedades();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al actualizar', 'Cerrar');
      }
    });
  }

  eliminarEnfermedad(id: number) {
    if (!id) return;
    if(confirm('¿Eliminar esta enfermedad?')) {
      this.enfermedadService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.cargarEnfermedades();
        },
        error: () => this.snackBar.open('Error al eliminar', 'Cerrar')
      });
    }
  }

  getColor(id: number): string {
    const colors = ['blue', 'red', 'green', 'purple', 'orange', 'teal'];
    return colors[id % colors.length];
  }
}
