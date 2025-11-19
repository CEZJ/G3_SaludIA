import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbar,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './nav-bar-component.html',
  styleUrls: ['./nav-bar-component.css'],
})
export class NavBarComponent implements OnInit {

  private router = inject(Router);

  // Controla si el navbar debe mostrarse
  showNavbar = false;

  // Controla si estamos en la página de Login o Registro (para ocultar el botón de 'Iniciar Sesión' si ya estamos ahí)
  isAuthPage = false;

  ngOnInit() {
    // Escuchar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;

      // 1. ¿Debemos mostrar el Navbar?
      // Solo en Inicio (/), Login y Registro
      const isHome = url === '/' || url === '/#inicio';
      const isLogin = url.includes('/login');
      const isRegister = url.includes('/nuevo-edit');

      this.showNavbar = isHome || isLogin || isRegister;

      // 2. ¿Estamos en una página de autenticación?
      // Esto nos sirve para ocultar el botón de "Login" si ya estamos en /login
      this.isAuthPage = isLogin || isRegister;
    });
  }

  scrollTo(sectionId: string): void {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.doScroll(sectionId), 100);
      });
    } else {
      this.doScroll(sectionId);
    }
  }

  private doScroll(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
}
