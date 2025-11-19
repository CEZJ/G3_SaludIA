import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, CommonModule } from '@angular/common';
import { Usuario } from '../../../model/usuario'; // <-- ¡Usando tu modelo Usuario!
import { UsuarioService } from '../../../services/usuario-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http'; // <-- Importar para errores detallados

@Component({
  selector: 'app-usuario-listar-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './usuario-listar-component.html',
  styleUrls: ['./usuario-listar-component.css'],
})
export class UsuarioListarComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idUsuario', 'nombre', 'fechaNacimiento', 'email', 'ubicacion', 'acciones'];

  // El DataSource espera 'Usuario'
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(){
    console.log("Llamando a mi API para listar usuarios...");

    // El servicio ahora devuelve Observable<Usuario[]>
    this.usuarioService.list().subscribe({
      next: data => {
        console.log("API me ha traido:", data);
        this.dataSource.data = data;
      },
      // --- MANEJO DE ERRORES MEJORADO ---
      error: (err: HttpErrorResponse) => {
        console.error("Error al listar usuarios:", err);
        let mensaje: string;

        if (err.status === 403) {
          mensaje = "No tienes permisos de Administrador para ver esta sección.";
          this.usuarioService.logout();
        } else if (err.status === 401) {
          mensaje = "Tu sesión ha expirado. Por favor, vuelve a ingresar.";
          this.usuarioService.logout();
        } else if (err.status === 0 || err.error instanceof ProgressEvent) {
          // Esto es 99% un error de CORS
          mensaje = "Error de CORS: El backend ha bloqueado la petición.";
          console.error("--- ¡PARECE UN ERROR DE CORS! ---");
          console.error("Verifica tu @CrossOrigin y WebSecurityConfig en Spring Boot.");
        } else {
          // Si el error es un 500 (error del servidor) o un 400 (error de parseo)
          mensaje = `Error al cargar datos. El backend falló. (Status: ${err.status})`;
        }

        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 7000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarUsuario(id: number) {
    this.router.navigate(['/admin/nuevo-edit', id]);
  }

  eliminarUsuario(id: number) {
    console.log("Eliminar usuario con ID:", id);
  }
}
