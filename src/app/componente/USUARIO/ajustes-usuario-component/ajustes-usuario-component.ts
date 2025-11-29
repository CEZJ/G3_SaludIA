import { Component, OnInit } from '@angular/core';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';

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
    MatSidenavModule,
    RouterLink
  ],
  templateUrl: './ajustes-usuario-component.html',
  styleUrls: ['./ajustes-usuario-component.css']
})
export class AjustesUsuarioComponent implements OnInit {

  activeTab: 'perfil' | 'seguridad' = 'perfil';

  userForm: FormGroup;
  securityForm: FormGroup;

  hideCurrentPass = true;
  hideNewPass = true;
  hideConfirmPass = true;

  // --- DATOS DE VISUALIZACIÓN (Encabezado) ---
  // Inicializamos vacíos para que no aparezca nombre por defecto.
  userInfo = {
    nombre: '',
    apellido: '',
    rol: 'Paciente'
  };

  // Imagen de perfil
  profileImage: string | ArrayBuffer | null = 'https://placehold.co/80x80';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    // Inicializar formulario con valores VACÍOS
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['']
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Al iniciar, cargamos lo que haya en memoria (si existe)
  ngOnInit(): void {
    this.loadUserData();
  }

  // --- CARGAR DATOS GUARDADOS (Persistencia) ---
  loadUserData(): void {
    const savedData = localStorage.getItem('user_profile_data');
    const savedImage = localStorage.getItem('user_profile_image');

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // 1. Rellenamos el formulario si hay datos guardados
      this.userForm.patchValue(parsedData);

      // 2. Actualizamos el encabezado con lo guardado
      this.userInfo.nombre = parsedData.nombre;
      this.userInfo.apellido = parsedData.apellido;
    }

    if (savedImage) {
      this.profileImage = savedImage;
    }
  }

  setActiveTab(tab: 'perfil' | 'seguridad') {
    this.activeTab = tab;
  }

  // --- LÓGICA DE SELECCIÓN DE IMAGEN ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Previsualización inmediata
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result ?? this.profileImage;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // --- GUARDAR CAMBIOS (Acción del Botón Rojo) ---
  onSaveProfile() {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      // 1. Guardar en LocalStorage (Persistencia)
      localStorage.setItem('user_profile_data', JSON.stringify(formValues));

      if (this.profileImage && typeof this.profileImage === 'string') {
        localStorage.setItem('user_profile_image', this.profileImage);
      }

      // 2. Actualizar el objeto de visualización (Actualizar Cuadro Amarillo)
      this.userInfo.nombre = formValues.nombre;
      this.userInfo.apellido = formValues.apellido;

      alert('¡Perfil actualizado y guardado correctamente!');
    }
  }

  onSaveSecurity() {
    if (this.securityForm.valid) {
      console.log('Contraseña actualizada:', this.securityForm.value);
      this.securityForm.reset();
      alert('Contraseña actualizada correctamente.');
    }
  }

  // --- CERRAR SESIÓN ---
  logout(): void {
    // Borrar datos al salir para que la próxima vez empiece de cero
    localStorage.removeItem('user_profile_data');
    localStorage.removeItem('user_profile_image');
    localStorage.removeItem('jwt_token');

    this.router.navigate(['/login']);
  }
}
