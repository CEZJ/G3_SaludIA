import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 1. Importar el servicio y las interfaces
// (Asegúrate que la ruta a tu servicio sea correcta)
import { UsuarioService, AuthRequest, AuthResponse } from '../../services/usuario-service'

// Módulos de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login', // Tu selector
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login-component.html', // Tu HTML
  styleUrls: ['./login-component.css'] // Tu CSS
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService, // Inyectar servicio
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const credentials: AuthRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.usuarioService.login(credentials).subscribe({
      next: () => {
        this.loading = false;

        // --- Lógica de Redirección por Rol ---

        if (this.usuarioService.isAdmin()) {
          // ¡CORREGIDO! Redirige a /admin/inicio
          this.snackBar.open('Bienvenido Administrador', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/inicio-admin']);

        } else if (this.usuarioService.isUser()) {
          // Redirige a /panel/inicio
          this.snackBar.open('Bienvenido', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/inicio-usuario']);

        } else {
          this.snackBar.open('Usuario sin roles definidos', 'Cerrar', {
            duration: 5000, panelClass: ['snackbar-error']
          });
        }
      },
      // --- ¡CORRECCIÓN AQUÍ! ---
      // Añade ": any" para darle un tipo al error
      error: (err: any) => {
        this.loading = false;
        this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
