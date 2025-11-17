import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; // Necesario para los campos de texto
import { MatButtonModule } from '@angular/material/button'; // Necesario para el botón Guardar

@Component({
  selector: 'app-admin-configuracion',
  // Es mejor usar 'standalone: true' si utilizas 'imports' directamente en el componente
  // Asumo que tu proyecto usa módulos, así que esto puede ser parte de un @NgModule.
  // Si fuera standalone, añadiríamos 'standalone: true' y los módulos a 'imports'
  // Si no es standalone, asegúrate de que todos los Módulos de Material están en tu App/Feature Module.
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin-configuracion.html',
  styleUrls: ['./admin-configuracion.css']
})
export class AdminConfiguracion {
  // Variable de estado para controlar qué vista se muestra
  seccionActiva: 'perfil' | 'seguridad' = 'perfil'; // Inicia en Perfil

  constructor() { }

  /**
   * Cambia la sección activa al hacer clic en el menú lateral.
   * @param seccion 'perfil' o 'seguridad'
   */
  cambiarSeccion(seccion: 'perfil' | 'seguridad') {
    this.seccionActiva = seccion;
  }
}
