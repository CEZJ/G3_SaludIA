import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, CommonModule } from '@angular/common';
import { Ubicacion } from '../../../model/ubicacion';
import { UbicacionService } from '../../../services/ubicacion-service';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

// Declaramos la variable global de Leaflet para que TypeScript la reconozca
declare const L: any;

@Component({
  selector: 'app-ubicacion-listar-component',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatListItem,
    MatNavList,
    MatSidenavModule,
    RouterLink,
  ],
  templateUrl: './ubicacion-listar-component.html',
  styleUrl: './ubicacion-listar-component.css',
})
export class UbicacionListarComponent implements AfterViewInit {

  constructor(private router: Router) {}

  // Usamos ngAfterViewInit para asegurar que el div del mapa ya existe
  ngAfterViewInit(): void {
    this.loadLeafletMap();
  }

  // --- LÓGICA DEL MAPA ---
  loadLeafletMap(): void {
    // 1. Verificar si ya existen los scripts para no recargarlos
    if (document.getElementById('leaflet-css')) {
      this.initMap();
      return;
    }

    // 2. Inyectar CSS de Leaflet desde CDN
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // 3. Inyectar JS de Leaflet desde CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      this.initMap(); // Inicializar mapa cuando cargue el script
    };
    document.head.appendChild(script);
  }

  initMap(): void {
    // Centro ajustado para ver Lima Metropolitana completa (incluyendo Callao y SJL)
    const limaCoords = [-12.0600, -77.0500];

    // Zoom en 11 o 12 para ver todo el panorama
    const map = L.map('map').setView(limaCoords, 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // ==========================================================
    // GRUPO 1: ZONAS DE RIESGO ALTO (ROJO)
    // ==========================================================

    // 1. Lima Centro (Gripe - 234)
    L.circle([-12.0464, -77.0428], {
      color: '#e53935', fillColor: '#e53935', fillOpacity: 0.4, radius: 1200
    }).addTo(map).bindPopup(this.createPopupHtml('Lima Centro', 'Alta', 'bg-red', 'border-red', 'Gripe', '234', '14/1/2024'));

    // 2. San Borja (Gripe - 178)
    L.circle([-12.1067, -77.0069], {
      color: '#e53935', fillColor: '#e53935', fillOpacity: 0.4, radius: 1000
    }).addTo(map).bindPopup(this.createPopupHtml('San Borja', 'Alta', 'bg-red', 'border-red', 'Gripe', '178', '14/1/2024'));

    // 3. Callao (Gripe - 198)
    L.circle([-12.0508, -77.1260], {
      color: '#e53935', fillColor: '#e53935', fillOpacity: 0.4, radius: 1500
    }).addTo(map).bindPopup(this.createPopupHtml('Callao', 'Alta', 'bg-red', 'border-red', 'Gripe', '198', '14/1/2024'));

    // 4. San Juan de Lurigancho (Gastroenteritis - 312)
    L.circle([-11.9675, -77.0039], {
      color: '#e53935', fillColor: '#e53935', fillOpacity: 0.4, radius: 1800
    }).addTo(map).bindPopup(this.createPopupHtml('San Juan de L.', 'Alta', 'bg-red', 'border-red', 'Gastroenteritis', '312', '14/1/2024'));


    // ==========================================================
    // GRUPO 2: ZONAS DE RIESGO MEDIO (NARANJA)
    // ==========================================================

    // 5. Miraflores (COVID-19 - 89)
    L.circle([-12.1111, -77.0316], {
      color: '#ff9800', fillColor: '#ff9800', fillOpacity: 0.4, radius: 1000
    }).addTo(map).bindPopup(this.createPopupHtml('Miraflores', 'Media', 'bg-orange', 'border-orange', 'COVID-19', '89', '14/1/2024'));

    // 6. Surco (Gastroenteritis - 145)
    L.circle([-12.1400, -76.9900], {
      color: '#ff9800', fillColor: '#ff9800', fillOpacity: 0.4, radius: 1200
    }).addTo(map).bindPopup(this.createPopupHtml('Surco', 'Media', 'bg-orange', 'border-orange', 'Gastroenteritis', '145', '14/1/2024'));


    // ==========================================================
    // GRUPO 3: ZONAS DE RIESGO BAJO (VERDE)
    // ==========================================================

    // 7. San Isidro (Gripe - 56)
    L.circle([-12.0967, -77.0353], {
      color: '#4caf50', fillColor: '#4caf50', fillOpacity: 0.4, radius: 900
    }).addTo(map).bindPopup(this.createPopupHtml('San Isidro', 'Baja', 'bg-green', 'border-green', 'Gripe', '56', '13/1/2024'));

    // 8. La Molina (COVID-19 - 67)
    L.circle([-12.0792, -76.9328], {
      color: '#4caf50', fillColor: '#4caf50', fillOpacity: 0.4, radius: 1000
    }).addTo(map).bindPopup(this.createPopupHtml('La Molina', 'Baja', 'bg-green', 'border-green', 'COVID-19', '67', '13/1/2024'));
  }

  // Helper para no repetir tanto código HTML
  createPopupHtml(distrito: string, nivel: string, badgeClass: string, borderClass: string, enfermedad: string, casos: string, fecha: string): string {
    return `
      <div class="custom-popup-card ${borderClass}">
        <div class="popup-header">
          <span class="popup-title">${distrito}</span>
          <span class="popup-badge ${badgeClass}">${nivel}</span>
        </div>
        <div class="popup-body">
          <strong>${enfermedad}</strong>
          <div class="popup-row"><span>Casos:</span> <b>${casos}</b></div>
          <div class="popup-row"><span>Actualizado:</span> <span>${fecha}</span></div>
        </div>
      </div>
    `;
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}
