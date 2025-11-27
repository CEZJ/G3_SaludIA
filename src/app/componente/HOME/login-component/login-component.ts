import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// 1. Importaciones de servicios y modelos
// Asegúrate de que AuthResponse tenga las propiedades 'token' y 'rol' (o authorities)
import { UsuarioService, AuthRequest, AuthResponse } from '../../../services/usuario-service';

// Módulos de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
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
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
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

    // Llamada al servicio
    this.usuarioService.login(credentials).subscribe({
      // Usamos 'any' para depurar mejor la estructura de datos que llega
      next: (data: any) => {
        this.loading = false;

        console.log('Respuesta del Backend:', data); // Ver en consola F12

        // =========================================================
        // 1. VALIDACIÓN ESTRICTA DEL TOKEN
        // =========================================================
        // Verificamos si realmente llegó un token antes de hacer nada más.
        // A veces el backend lo manda como 'accessToken', 'jwt', o 'token'.
        const tokenRecibido = data.token || data.accessToken || data.jwt;

        if (!tokenRecibido) {
          console.error('ERROR: El backend no envió un token válido en la respuesta.');
          this.snackBar.open('Error de autenticación: No se recibió el token.', 'Cerrar', { duration: 5000 });
          return; // DETENEMOS AQUÍ SI NO HAY TOKEN
        }

        // 2. GUARDAR EN LOCALSTORAGE
        localStorage.setItem('token', tokenRecibido);

        // (Opcional) Si el backend devuelve el rol aquí, guárdalo también para ayudar al isAdmin()
        // if (data.rol) localStorage.setItem('rol', data.rol);

        // =========================================================
        // 3. LÓGICA DE REDIRECCIÓN
        // =========================================================

        // Verificamos que el item se haya guardado antes de navegar
        if (localStorage.getItem('token')) {

          if (this.usuarioService.isAdmin()) {
            this.snackBar.open('Bienvenido Administrador', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/inicio-admin']);

          } else if (this.usuarioService.isUser()) {
            this.snackBar.open('Bienvenido Usuario', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/inicio-usuario']);

          } else {
            // Si el rol no coincide con ninguno, mandamos a una ruta segura por defecto
            this.snackBar.open('Bienvenido', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/']);
          }

        } else {
          console.error('El token no se pudo guardar en el navegador.');
        }
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Login error completo:', err);

        // Manejo de errores específicos
        let mensaje = 'Error de conexión con el servidor';
        if (err.status === 401 || err.status === 403) {
          mensaje = 'Credenciales incorrectas';
        }

        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
