import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Módulos de Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Servicio y Modelo (Ajusta la cantidad de ../ según tu carpeta)
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../model/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-gestionar-usuarios-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-gestionar-usuarios-component.html',
  styleUrls: ['./admin-gestionar-usuarios-component.css']
})
export class AdminGestionarUsuariosComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);

  // Listas de usuarios
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];

  // Filtros
  filterId: string = '';
  filterName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * Conecta con el Backend para obtener la lista real de usuarios.
   */
  cargarUsuarios() {
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => {
        console.log("Usuarios cargados:", data);
        this.usuarios = data;
        this.filteredUsuarios = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error("Error al cargar usuarios:", err);
        this.snackBar.open('Error al conectar con el servidor', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  /**
   * Filtra la tabla en tiempo real.
   * Busca por ID, Nombre, Correo, Dirección o Distrito.
   */
  applyFilter() {
    const term = this.filterName.toLowerCase().trim();
    const idTerm = this.filterId.toString().trim();

    this.filteredUsuarios = this.usuarios.filter(u => {
      // Filtro por ID (si se escribió algo)
      const matchId = idTerm ? u.idUsuario.toString().includes(idTerm) : true;

      // Filtro por Texto (Nombre, Username, Dirección, Distrito)
      let matchText = true;
      if (term) {
        matchText =
          (u.nombre?.toLowerCase().includes(term) || false) ||
          (u.email?.toLowerCase().includes(term) || false) ||
          // Navegación segura (?) para evitar errores si no hay ubicación
          (u.ubicacion?.direccion?.toLowerCase().includes(term) || false) ||
          (u.ubicacion?.distrito?.toLowerCase().includes(term) || false);
      }

      return matchId && matchText;
    });
  }

  eliminarUsuario(id: number) {
    if(confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
          this.cargarUsuarios(); // Recargar lista
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al eliminar', 'Cerrar', { panelClass: ['snackbar-error'] });
        }
      });
    }
  }
}
