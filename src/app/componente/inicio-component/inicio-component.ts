import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// --- Módulos de Angular Material ---
// ¡Importamos TODO lo que necesita el HTML!
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// --- Iconos SVG personalizados ---
// (Estos son para los iconos sociales del footer que no están en Material Icons)
const SVG_ICONS = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.724-.664 1.565-.664 2.458 0 1.914.97 3.618 2.444 4.61a4.52 4.52 0 0 1-2.062-.564v.061c0 2.669 1.88 4.897 4.37 5.402-.455.123-.935.19-1.428.19-.35 0-.69-.035-1.022-.098.7 2.188 2.73 3.788 5.14 3.832-1.868 1.464-4.22 2.34-6.78 2.34-.44 0-.87-.026-1.3-.076 2.418 1.56 5.29 2.48 8.38 2.48 10.07 0 15.58-8.34 15.58-15.58 0-.238-.005-.476-.015-.712.96-.69 1.79-1.56 2.45-2.55z"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.792 4.659-4.792 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.669 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.227-.148-4.771-1.669-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.669-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.28-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.28.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.197-4.358-2.617-6.78-6.979-6.98-1.28-.059-1.689-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.75 0-1.364.614-1.364 1.364s.614 1.364 1.364 1.364 1.364-.614 1.364-1.364-.614-1.364-1.364-1.364z"/></svg>`
};


@Component({
  selector: 'app-inicio', // Puedes cambiar este selector
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Para routerLink="/login"
    ReactiveFormsModule, // Para el formulario de contacto
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inicio-component.html',
  styleUrls: ['./inicio-component.css']
})
export class InicioComponent implements OnInit {
  contactForm: FormGroup;
  currentYear = new Date().getFullYear();

  // Lista de Características (He reemplazado los "SOY UN GORDO" con contenido profesional)
  featuresList = [
    { icon: 'bubble_chart', title: 'Diagnóstico', text: 'Análisis médico que asiste en diagnósticos precisos y rápidos.' },
    { icon: 'timeline', title: 'Monitoreo en Tiempo Real', text: 'Seguimiento continuo de síntomas y signos vitales.' },
    { icon: 'security', title: 'Seguridad de Datos', text: 'Protección máxima con encriptación de nivel hospitalario.' },
    { icon: 'support_agent', title: 'Atención 24/7', text: 'Asistencia médica virtual disponible en cualquier momento del día.' },
    { icon: 'analytics', title: 'Análisis Predictivo', text: 'Modelos de IA que predicen brotes y riesgos de salud.' },
    { icon: 'public', title: 'Cobertura Global', text: 'Acceso a la plataforma desde cualquier parte del mundo.' }
  ];

  // Lista del Equipo (con imágenes de placeholder)
  teamList = [
    { name: 'Cristina Sihuas', role: 'Ingeniera de Sistemas', img: 'https://placehold.co/300x400/791a2a/ffffff?text=Cristina' },
    { name: 'Franck', role: 'Ingeniero de Sistemas', img: 'https://placehold.co/300x400/791a2a/ffffff?text=Franck' },
    { name: 'Carlos Enrique', role: 'Ingeniero de Sistemas', img: 'https://placehold.co/300x400/791a2a/ffffff?text=Carlos' },
    { name: 'Miguel', role: 'Ingeniero de Sistemas', img: 'https://placehold.co/300x400/791a2a/ffffff?text=Miguel' },
    { name: 'Antu', role: 'Ingeniera de Sistemas', img: 'https://placehold.co/300x400/791a2a/ffffff?text=Antu' }
  ];

  constructor(
    private fb: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Crear el formulario de contacto
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      mensaje: ['', Validators.required]
    });

    // Registrar los iconos SVG personalizados
    Object.keys(SVG_ICONS).forEach(key => {
      this.iconRegistry.addSvgIconLiteral(key, this.sanitizer.bypassSecurityTrustHtml(SVG_ICONS[key as keyof typeof SVG_ICONS]));
    });
  }

  ngOnInit(): void { }

  /**
   * Navega a una sección de la página con un scroll suave
   * @param sectionId El ID del elemento de la sección
   */
  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  /**
   * Maneja el envío del formulario de contacto
   */
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      // Aquí iría la lógica para enviar el formulario a un backend
      this.contactForm.reset();
      // (Opcional) Mostrar un snackbar de éxito
    }
  }
}
