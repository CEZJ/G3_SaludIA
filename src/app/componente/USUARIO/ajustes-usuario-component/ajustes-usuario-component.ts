import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// --- Módulos de Angular Material ---
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-ajustes-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatSidenav,
    RouterLink
  ],
  templateUrl: './ajustes-usuario-component.html',
  styleUrls: ['./ajustes-usuario-component.css']
})
export class AjustesUsuarioComponent {

  activeTab: 'perfil' | 'seguridad' = 'perfil';

  userForm: FormGroup;
  securityForm: FormGroup;

  // Variables para ocultar/mostrar contraseñas
  hideCurrentPass = true;
  hideNewPass = true;
  hideConfirmPass = true;

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializar formulario de perfil con datos ficticios
    this.userForm = this.fb.group({
      nombre: ['Cristina', Validators.required],
      apellido: ['Sihuas', Validators.required],
      email: ['cristina.sihuas@saludai.com', [Validators.required, Validators.email]],
      telefono: ['+51 987 654 321']
    });

    // Inicializar formulario de seguridad
    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  setActiveTab(tab: 'perfil' | 'seguridad') {
    this.activeTab = tab;
  }

  onSaveProfile() {
    if (this.userForm.valid) {
      console.log('Datos de perfil guardados:', this.userForm.value);
      // Aquí llamarías a tu servicio para actualizar el perfil
    }
  }

  onSaveSecurity() {
    if (this.securityForm.valid) {
      console.log('Contraseña actualizada:', this.securityForm.value);
      // Aquí llamarías a tu servicio para cambiar la contraseña
      this.securityForm.reset();
    }
  }
  // Inyectamos el Router para la función de logout

  /**
   * Función de ejemplo para cerrar sesión.
   * Limpia el almacenamiento local y redirige al login.
   */
  logout(): void {
    // Lógica de logout (ej. limpiar token)
    localStorage.removeItem('jwt_token');

    // Redirigir a la página de login
    this.router.navigate(['/login']);
  }

}
