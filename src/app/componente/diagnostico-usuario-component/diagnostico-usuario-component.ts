import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Módulos de Angular Material ---
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

// --- Interfaces para nuestros datos ---
export interface Symptom {
  name: string;
  selected: boolean;
}

export interface SymptomCategory {
  name: string;
  symptoms: Symptom[];
}

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule
  ],
  templateUrl: './diagnostico-usuario-component.html',
  styleUrls: ['./diagnostico-usuario-component.css']
})
export class DiagnosticoComponent {

  // Señal para manejar el estado de la vista
  public showResults = signal(false);

  // Señal para manejar los datos de los síntomas
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

  // Señal computada para obtener solo los síntomas seleccionados
  public selectedSymptoms = computed(() => {
    return this.symptomCategories()
      .flatMap(category => category.symptoms) // Aplana el array
      .filter(symptom => symptom.selected); // Filtra solo los seleccionados
  });

  /**
   * Cambia el estado 'selected' de un síntoma
   */
  toggleSymptom(symptomToToggle: Symptom): void {
    // Actualiza la señal inmutablemente
    this.symptomCategories.update(categories =>
      categories.map(category => ({
        ...category,
        symptoms: category.symptoms.map(symptom =>
          symptom.name === symptomToToggle.name
            ? { ...symptom, selected: !symptom.selected }
            : symptom
        )
      }))
    );
  }

  /**
   * Muestra la pantalla de resultados
   */
  getDiagnosis(): void {
    this.showResults.set(true);
    // En una app real, aquí llamarías a tu API de IA
    // y pasarías this.selectedSymptoms() como payload.
  }

  /**
   * Resetea la vista al estado de selección
   */
  resetDiagnosis(): void {
    this.showResults.set(false);
    // Opcional: deseleccionar todos los síntomas
    this.symptomCategories.update(categories =>
      categories.map(category => ({
        ...category,
        symptoms: category.symptoms.map(symptom => ({ ...symptom, selected: false }))
      }))
    );
  }
}
