import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <--- IMPORTANTE
import { MatIconModule } from '@angular/material/icon';

import { Sintoma } from '../../../../model/sintoma';
import { SintomaService } from '../../../../services/sintoma-service';

@Component({
  selector: 'app-enfermedad-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <div style="display: flex; align-items: center; gap: 10px;">
        <mat-icon>{{ data ? 'edit' : 'add_circle' }}</mat-icon>
        {{ data ? 'Editar' : 'Nueva' }} Enfermedad
      </div>
    </h2>

    <mat-dialog-content>
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 15px; padding-top: 10px;">

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nombre de la Enfermedad</mat-label>
          <input matInput formControlName="nombre" placeholder="Ej. Dengue">
          <mat-error *ngIf="form.get('nombre')?.hasError('required')">Requerido</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="descripcion" rows="3"></textarea>
          <mat-error *ngIf="form.get('descripcion')?.hasError('required')">Requerido</mat-error>
        </mat-form-field>

        <!-- SELECTOR MÚLTIPLE CORREGIDO -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Seleccionar Síntomas</mat-label>

          <mat-select formControlName="sintomasIds" multiple>
            <!--
               CORRECCIÓN CLAVE: Usamos 's.id' o 's.idSintoma'
               Ahora que el modelo tiene 'id', esto capturará el valor correcto.
            -->
            <mat-option *ngFor="let s of listaSintomas" [value]="s.id || s.idSintoma">
              {{ s.nombre }}
            </mat-option>
          </mat-select>

          <mat-error *ngIf="form.get('sintomasIds')?.hasError('required')">Seleccione al menos uno</mat-error>
        </mat-form-field>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="warn">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="guardar()">
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.w-full { width: 100%; }`]
})
export class EnfermedadDialogComponent implements OnInit {
  form: FormGroup;
  listaSintomas: Sintoma[] = [];

  private sintomaService = inject(SintomaService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnfermedadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      // Mapeamos ID de enfermedad
      idEnfermedad: [data?.idEnfermedad || data?.id || null],
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],

      // Mapeamos los síntomas. Si es edición, 'data.sintomasIds' debe venir del backend.
      sintomasIds: [data?.sintomasIds || [], Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargamos la lista de síntomas
    this.sintomaService.list().subscribe({
      next: (data) => {
        this.listaSintomas = data;
        console.log('Síntomas cargados (Verificar campo ID):', data);
      },
      error: (e) => console.error('Error cargando síntomas:', e)
    });
  }

  guardar() {
    if (this.form.valid) {
      // Al cerrar, pasamos el objeto con el formato:
      // { nombre: 'X', descripcion: 'Y', sintomasIds: [1, 2, 3] }
      this.dialogRef.close(this.form.value);
    }
  }
}
