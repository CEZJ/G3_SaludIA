import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// --- Módulos de Angular Material ---
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-inicio-usuario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './inicio-usuario-component.html',
  styleUrls: ['./inicio-usuario-component.css']
})
export class InicioUsuarioComponent implements OnInit {

  // Imagen por defecto (si no hay nada guardado)
  profileImage: string | ArrayBuffer | null = 'https://placehold.co/40x40';

  // Nombre de usuario por defecto
  userName: string = 'Usuario';

  // Variable para el número de diagnósticos
  diagnosticosCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDiagnosticosCount();
  }

  // --- 1. Cargar Datos de Usuario ---
  loadUserData(): void {
    // Cargar la imagen guardada
    const savedImage = localStorage.getItem('user_profile_image');
    if (savedImage) {
      this.profileImage = savedImage;
    }

    // Cargar el nombre guardado
    const savedData = localStorage.getItem('user_profile_data');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.userName = parsedData.nombre || 'Usuario';
    }
  }

  // --- 2. Cargar o Generar Número Aleatorio Persistente ---
  loadDiagnosticosCount(): void {
    const savedCount = localStorage.getItem('diagnosticos_count');

    if (savedCount) {
      // Si ya existe un número guardado en esta sesión, lo usamos (NO cambia)
      this.diagnosticosCount = parseInt(savedCount, 10);
    } else {
      // Si no existe (es la primera vez), generamos uno nuevo
      this.diagnosticosCount = Math.floor(Math.random() * 21);
      // Y lo guardamos para que no cambie mientras navegas
      localStorage.setItem('diagnosticos_count', this.diagnosticosCount.toString());
    }
  }

  logout(): void {
    // Limpiamos token
    localStorage.removeItem('jwt_token');

    // IMPORTANTE: Borramos el número guardado al cerrar sesión
    // Así, la próxima vez que entres se generará uno nuevo.
    localStorage.removeItem('diagnosticos_count');

    // Opcional: Si quieres borrar foto y datos al salir, descomenta:
    // localStorage.removeItem('user_profile_image');
    // localStorage.removeItem('user_profile_data');

    this.router.navigate(['/login']);
  }
}
