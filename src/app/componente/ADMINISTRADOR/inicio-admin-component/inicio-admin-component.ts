import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-inicio-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './inicio-admin-component.html',
  styleUrls: ['./inicio-admin-component.css']
})
export class InicioAdminComponent {
  featuresList = [
    {
      title: 'Inteligencia Artificial Avanzada',
      text: 'Algoritmos de última generación para diagnósticos precisos.',
      icon: 'auto_awesome',
      color: '#8b5cf6',
      bgColor: '#f5f3ff'
    },
    {
      title: 'Seguridad y Privacidad',
      text: 'Protección total de datos médicos sensibles.',
      icon: 'security',
      color: '#22c55e',
      bgColor: '#f0fdf4'
    },
    {
      title: 'Monitoreo en Tiempo Real',
      text: 'Seguimiento continuo de síntomas y enfermedades.',
      icon: 'timeline',
      color: '#0ea5e9',
      bgColor: '#f0f9ff'
    },
    {
      title: 'Análisis Predictivo',
      text: 'Predicción de tendencias y prevención de brotes.',
      icon: 'analytics',
      color: '#f97316',
      bgColor: '#fff7ed'
    }
  ];

}


