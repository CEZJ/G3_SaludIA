import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-gestionar-usuarios-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './admin-gestionar-usuarios.html',
  styleUrls: ['./admin-gestionar-usuarios.css']
})
export class GestionarUsuariosComponent {
  usuarios = [
    { usuario: 'Juan Perez', id: 1, correo: 'juan@example.com', direccion: 'Av. Lima 123', distrito: 'Miraflores', estado: 'Activo' },
    { usuario: 'Maria Lopez', id: 2, correo: 'maria@example.com', direccion: 'Calle 456', distrito: 'San Isidro', estado: 'Inactivo' },
    { usuario: 'Carlos Diaz', id: 3, correo: 'carlos@example.com', direccion: 'Jr. Los Olivos 789', distrito: 'Surco', estado: 'Activo' },
    { usuario: 'Ana Torres', id: 4, correo: 'ana@example.com', direccion: 'Av. Arequipa 101', distrito: 'Lince', estado: 'Activo' },
    { usuario: 'Luis Ramos', id: 5, correo: 'luis@example.com', direccion: 'Calle Las Flores 202', distrito: 'Barranco', estado: 'Inactivo' }
  ];

  filterId: number | null = null;
  filterName: string = '';
  filteredUsuarios = [...this.usuarios];

  applyFilter() {
    this.filteredUsuarios = this.usuarios.filter(u => {
      const matchId = this.filterId ? u.id === this.filterId : true;
      const matchName = this.filterName ? u.usuario.toLowerCase().includes(this.filterName.toLowerCase()) : true;
      return matchId && matchName;
    });
  }
}
