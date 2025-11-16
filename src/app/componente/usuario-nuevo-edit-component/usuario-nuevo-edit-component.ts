import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ¡Clave para formularios!
import {Router, RouterLink, RouterModule} from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 1. Importar el servicio
import { UsuarioService } from '../../services/usuario-service'; // Ajusta la ruta si es necesario

// 2. Importar los módulos de Material que usaremos (por ser Standalone)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
// MatNativeDateModule ya está proveído en app.config.ts

@Component({
  selector: 'app-usuario-nuevo-edit-component',
  templateUrl: './usuario-nuevo-edit-component.html',
  styleUrls: ['./usuario-nuevo-edit-component.css'],
  standalone: true, // <-- 3. Marcamos como Standalone
  imports: [
    // 4. Importamos todo lo necesario
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    RouterLink
  ]
})
export class UsuarioNuevoEditComponent implements OnInit {

  usuarioForm: FormGroup;
  loading = false;
  // Como tu componente se llama "nuevo-edit", podríamos tener un modo de edición
  // pero por ahora nos centramos en "nuevo" (registro).

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, // Inyectamos el servicio
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // 5. Creamos el FormGroup
    this.usuarioForm = this.fb.group({
      // Los nombres deben coincidir EXACTAMENTE con el DTO (RegisterRequest)
      nombre: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]], // 'username' es el email
      password: ['', [Validators.required, Validators.minLength(8)]],
      fechaNacimiento: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Aquí iría la lógica si estuviéramos en modo "Editar"
    // (ej. cargar datos del usuario por un ID de la URL)
  }

  /**
   * Se llama al enviar el formulario
   */
  onSubmit(): void {
    // Si el formulario no es válido, detenemos y marcamos los errores
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // 6. Llamamos al método register() del servicio
    this.usuarioService.register(this.usuarioForm.value).subscribe({
      next: (response) => {
        // ¡Éxito!
        this.loading = false;

        // Mostramos notificación de éxito
        this.snackBar.open(response, 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-success'] // (Puedes definir esta clase en styles.css)
        });

        // Redirigimos al login (asumiendo que tienes una ruta /login)
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // ¡Error!
        this.loading = false;

        // 'err.error' contendrá el mensaje de texto de tu backend
        // (ej. "Error: El nombre de usuario (email) ya está en uso.")
        this.snackBar.open(err.error, 'Cerrar', {
          duration: 7000,
          panelClass: ['snackbar-error'] // (Puedes definir esta clase en styles.css)
        });
      }
    });
  }
}
