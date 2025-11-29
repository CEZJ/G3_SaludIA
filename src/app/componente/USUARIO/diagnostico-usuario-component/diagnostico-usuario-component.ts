import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Módulos de Angular Material ---
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import {Router, RouterLink} from '@angular/router';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenav} from '@angular/material/sidenav';

// Interfaces
export interface Symptom {
  name: string;
  selected: boolean;
}

export interface SymptomCategory {
  name: string;
  symptoms: Symptom[];
}

@Component({
  selector: 'app-diagnostico-usuario-componente', // Selector actualizado
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatListItem,
    MatNavList,
    MatSidenav,
    RouterLink
  ],
  templateUrl: './diagnostico-usuario-component.html', // Nombre de archivo actualizado
  styleUrls: ['./diagnostico-usuario-component.css']   // Nombre de archivo actualizado
})
export class DiagnosticoUsuarioComponent { // Nombre de clase actualizado

  // Estado: ¿Estamos viendo los resultados?
  public showResults = signal(false);

  // Datos: Categorías y Síntomas
  public symptomCategories = signal<SymptomCategory[]>([
    {
      name: 'General',
      symptoms: [
        { name: 'Fiebre', selected: false },
        { name: 'Dolor de cabeza', selected: false },
        { name: 'Fatiga', selected: false },
        { name: 'Dolor corporal', selected: false },
        { name: 'Mareos', selected: false },
        { name: 'Escalofríos', selected: false }
      ]
    },
    {
      name: 'Respiratorio',
      symptoms: [
        { name: 'Tos', selected: false },
        { name: 'Dolor de garganta', selected: false },
        { name: 'Secreción nasal', selected: false },
        { name: 'Dificultad para respirar', selected: false },
        { name: 'Dolor en el pecho', selected: false },
        { name: 'Congestión nasal', selected: false }
      ]
    },
    {
      name: 'Digestivo',
      symptoms: [
        { name: 'Náuseas', selected: false },
        { name: 'Diarrea', selected: false },
        { name: 'Vómitos', selected: false }
      ]
    },
    {
      name: 'Piel',
      symptoms: [
        { name: 'Erupción cutánea', selected: false }
      ]
    }
  ]);

  // Computada: Obtiene la lista plana de síntomas seleccionados
  public selectedSymptoms = computed(() => {
    return this.symptomCategories()
      .flatMap(cat => cat.symptoms)
      .filter(s => s.selected);
  });

  /**
   * Marca/Desmarca un síntoma
   */
  toggleSymptom(symptomToToggle: Symptom): void {
    this.symptomCategories.update(categories =>
      categories.map(cat => ({
        ...cat,
        symptoms: cat.symptoms.map(s =>
          s.name === symptomToToggle.name
            ? { ...s, selected: !s.selected }
            : s
        )
      }))
    );
  }

  /**
   * Muestra la pantalla de resultados
   */
  getDiagnosis(): void {
    this.showResults.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Reinicia el formulario
   */
  resetDiagnosis(): void {
    this.showResults.set(false);
    this.symptomCategories.update(categories =>
      categories.map(cat => ({
        ...cat,
        symptoms: cat.symptoms.map(s => ({ ...s, selected: false }))
      }))
    );
  }

  // Inyectamos el Router para la función de logout
  constructor(private router: Router) {}

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
