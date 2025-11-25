import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admin-gestionar-enfermedades-component',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './admin-gestionar-enfermedades-component.html',
  styleUrls: ['./admin-gestionar-enfermedades-component.css']
})
export class AdminGestionarEnfermedadesComponent {
  // Copia esto dentro de tu clase en el .ts para que funcione el HTML
  enfermedades = [
    { id: 1, nombre: 'COVID-19', color: 'blue', icon: 'coronavirus', estado: 'Critical', desc: 'Fiebre, tos seca, fatiga', duracion: '2-14 días' },
    { id: 2, nombre: 'Influenza', color: 'red', icon: 'air', estado: 'Follow-up', desc: 'Fiebre alta, dolor muscular', duracion: '1-4 días' },
    { id: 3, nombre: 'Dengue', color: 'green', icon: 'pest_control', estado: 'Critical', desc: 'Fiebre alta, dolor articular', duracion: '4-10 días' },
    { id: 4, nombre: 'Tuberculosis', color: 'purple', icon: 'masks', estado: 'Critical', desc: 'Tos persistente, sudoración', duracion: 'Más de 3 semanas' },
    { id: 5, nombre: 'Malaria', color: 'orange', icon: 'water_drop', estado: 'Critical', desc: 'Fiebre cíclica, escalofríos', duracion: '10-15 días' },
    { id: 6, nombre: 'Hepatitis B', color: 'teal', icon: 'medical_services', estado: 'Follow-up', desc: 'Ictericia, fatiga severa', duracion: '1-6 meses' }
  ];
}
