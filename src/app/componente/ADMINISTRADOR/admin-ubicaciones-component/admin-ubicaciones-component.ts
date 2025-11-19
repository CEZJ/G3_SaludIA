import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Modelos y Servicios
import { Ubicacion } from '../../../model/ubicacion';
import { UbicacionService } from '../../../services/ubicacion-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-ubicaciones-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-ubicaciones-component.html',
  styleUrls: ['./admin-ubicaciones-component.css']
})
export class AdminUbicacionesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['idUbicacion', 'distrito', 'provincia', 'direccion'];
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource<Ubicacion>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private ubicacionService = inject(UbicacionService);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  ngOnInit() {
    this.cargarUbicaciones();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarUbicaciones() {
    console.log("Llamando a API de Ubicaciones...");
    this.ubicacionService.list().subscribe({
      next: (data) => {
        console.log("Ubicaciones recibidas:", data);
        this.dataSource.data = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar ubicaciones', err);
        this.snackBar.open('Error al cargar las ubicaciones', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
