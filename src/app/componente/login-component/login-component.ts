import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ¡Importar RouterModule!
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 1. Importar el servicio y las interfaces
import { UsuarioService, AuthRequest, AuthResponse } from '../../services/usuario-service';

// 2. Importar Módulos de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  // 3. Importar todos los módulos necesarios
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // Necesario para routerLink
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: '././login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, // 4. Inyectar el servicio
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // 5. Crear el formulario de login
    this.loginForm = this.fb.group({
      // El backend espera 'username' y 'password'
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    // Si el formulario es inválido, no hacer nada
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const credentials: AuthRequest = this.loginForm.value;

    // 6. Llamar al servicio de login
    this.usuarioService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        this.loading = false;

        // --- ¡LÓGICA DE LOGIN EXITOSO! ---

        // 1. Guardamos el token en el almacenamiento local
        localStorage.setItem('jwt_token', response.jwt);

        // 2. (Opcional) Guardamos los roles
        // localStorage.setItem('user_roles', JSON.stringify(response.roles));

        // 3. Mostramos un mensaje de bienvenida
        this.snackBar.open('¡Bienvenido!', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        // 4. Redirigimos a la página principal (ej. /inicio)
        this.router.navigate(['/inicio']); // <-- Ajusta esta ruta a tu página principal
      },
      error: (err) => {
        // 7. Manejo de error (usuario no encontrado en BD)
        this.loading = false;
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
