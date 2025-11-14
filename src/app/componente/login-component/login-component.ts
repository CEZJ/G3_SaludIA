import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 1. Asumiendo que tu servicio está en esta ruta
import { UsuarioService, AuthRequest, AuthResponse } from '../../services/usuario-service';

// 2. Módulos de Material NECESARIOS
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // <-- ¡Crítico para los iconos!
import { MatCheckboxModule } from '@angular/material/checkbox'; // <-- ¡Crítico para el checkbox!

@Component({
  selector: 'app-login',
  standalone: true,
  // 3. Importar TODOS los módulos en el componente standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule, // <-- ¡Asegúrate de que esté aquí!
    MatCheckboxModule // <-- ¡Asegúrate de que esté aquí!
  ],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true; // Para el botón de ver/ocultar contraseña

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // 4. Crear formulario
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false] // Añadido para el checkbox
    });
  }

  // 5. Función para el botón del ojo
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // 6. Crear el objeto AuthRequest
    const credentials: AuthRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };


    // 7. Llamar al servicio
    this.usuarioService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        this.loading = false;
        localStorage.setItem('jwt_token', response.jwt);

        this.snackBar.open('¡Bienvenido!', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });

        this.router.navigate(['/inicio']); // Ajusta esta ruta
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
