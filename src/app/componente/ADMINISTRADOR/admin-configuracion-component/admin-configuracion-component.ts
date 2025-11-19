import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './admin-configuracion-component.html',
  styleUrls: ['./admin-configuracion-component.css']
})
export class AdminConfiguracionComponent implements OnInit {

  activeTab: string = 'perfil'; // Pestaña activa por defecto
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con los datos que se ven en la imagen
    this.profileForm = this.fb.group({
      nombre: ['Cristina', Validators.required],
      apellido: ['Sihuas', Validators.required],
      email: ['cristina.sihuas@saludai.com', [Validators.required, Validators.email]],
      telefono: ['+51 987 654 321'],
      direccion: ['Av. Arequipa 1234, Lima, Perú'],
      pais: ['Perú'],
      idioma: ['Español']
    });
  }

  ngOnInit(): void {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Datos guardados:', this.profileForm.value);
      // Aquí llamarías a tu servicio para actualizar el usuario
    }
  }
}
