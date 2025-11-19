import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// --- Módulos de Material ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select'; // <-- ¡Nuevo para los selectores!
import { MatCheckboxModule } from '@angular/material/checkbox'; // <-- ¡Nuevo para los términos!
import { MatIconModule } from '@angular/material/icon';

// Importar el servicio
import { UsuarioService } from '../../../services/usuario-service'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,   // <-- Importado
    MatCheckboxModule, // <-- Importado
    MatIconModule,
    MatSnackBarModule,
    RouterLink
  ]
})
export class RegisterComponent implements OnInit {

  usuarioForm: FormGroup;
  loading = false;
  hidePassword = true;

  // --- Datos para los Selectores ---
  provincias: string[] = ['Lima'];

  // Mapa simple de distritos por provincia
  distritosPorProvincia: { [key: string]: string[] } = {
    'Lima': [
      'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Cercado de Lima',
      'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino',
      'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince',
      'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores',
      'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa',
      'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro',
      'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis',
      'San Martin de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar',
      'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa el Salvador',
      'Villa Maria del Triunfo'
    ],
  };

  // Lista de distritos que se mostrará (se actualiza al elegir provincia)
  distritosDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.usuarioForm = this.fb.group({
      // Campos requeridos por tu backend
      nombre: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]], // Email
      password: ['', [Validators.required, Validators.minLength(8)]],
      fechaNacimiento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]], // Ahora será un select
      direccion: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]] // Checkbox de términos
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en la provincia para actualizar distritos
    this.usuarioForm.get('provincia')?.valueChanges.subscribe(provincia => {
      this.distritosDisponibles = this.distritosPorProvincia[provincia] || [];
      // Resetear distrito si cambia la provincia
      this.usuarioForm.get('distrito')?.setValue('');
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // Excluir 'terms' del objeto que se envía al backend si no lo espera
    const { terms, ...requestData } = this.usuarioForm.value;

    this.usuarioService.register(requestData).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('¡Cuenta creada exitosamente!', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        // Manejo básico de errores
        const errorMsg = err.error || 'Error al registrar usuario';
        this.snackBar.open(errorMsg, 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
