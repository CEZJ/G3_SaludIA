import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // IMPORTANTE
import { MatIconModule } from '@angular/material/icon';

// Asegúrate de que las rutas a tus modelos y servicios sean correctas
import { Sintoma } from '../../../../model/sintoma';
import { SintomaService } from '../../../../services/sintoma-service';

@Component({
  selector: 'app-enfermedad-dialog',
  standalone: true,
  imports: [
    CommonModule,         // CRUCIAL para *ngFor
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,      // CRUCIAL para el selector
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

        <!-- Nombre -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nombre de la Enfermedad</mat-label>
          <input matInput formControlName="nombre" placeholder="Ej. Dengue">
          <mat-error *ngIf="form.get('nombre')?.hasError('required')">El nombre es requerido</mat-error>
        </mat-form-field>

        <!-- Descripción -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Descripción / Síntomas comunes</mat-label>
          <textarea matInput formControlName="descripcion" rows="3" placeholder="Describa la enfermedad..."></textarea>
          <mat-error *ngIf="form.get('descripcion')?.hasError('required')">La descripción es requerida</mat-error>
        </mat-form-field>

        <!-- SELECTOR DE SÍNTOMAS -->
        <!-- Si la lista está vacía, mostramos un aviso -->
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Síntoma Principal Asociado</mat-label>
          <mat-select formControlName="idSintoma">
            <mat-option *ngIf="listaSintomas.length === 0" disabled>
              -- No hay síntomas registrados --
            </mat-option>

            <mat-option *ngFor="let s of listaSintomas" [value]="s.idSintoma">
              {{ s.nombre }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('idSintoma')?.hasError('required')">Debe seleccionar un síntoma</mat-error>
          <mat-hint align="end">{{ listaSintomas.length }} síntomas disponibles</mat-hint>
        </mat-form-field>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="warn">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="guardar()">
        {{ data ? 'Actualizar' : 'Guardar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .w-full { width: 100%; }
    mat-dialog-content { min-width: 400px; }
  `]
})
export class EnfermedadDialogComponent implements OnInit {
  form: FormGroup;
  listaSintomas: Sintoma[] = [];

  // Inyección de servicios
  private sintomaService = inject(SintomaService);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnfermedadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      idEnfermedad: [data?.idEnfermedad || null],
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '', Validators.required],
      idSintoma: [data?.idSintoma || '', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("Cargando síntomas para el selector...");

    this.sintomaService.list().subscribe({
      next: (data) => {
        console.log("Síntomas cargados:", data); // Verifica esto en la consola F12
        this.listaSintomas = data;
      },
      error: (err) => {
        console.error("Error al cargar síntomas en el diálogo:", err);
      }
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
