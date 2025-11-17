import {Component, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Ubicacion} from '../../../model/ubicacion';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {UbicacionService} from '../../../services/ubicacion-service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-admin-ubicaciones',
  imports: [
    CommonModule,
    RouterModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule, // Usado para el contenedor de la tabla
    MatIconModule,  // Usado para MatIcon
    MatInputModule,
    MatButtonModule,

    // Módulo de Angular
    CommonModule,
  ],
  templateUrl: './admin-ubicaciones.html',
  styleUrls: ['./admin-ubicaciones.css']
})
export class AdminUbicaciones {
  displayedColumns: string[] = ['idUbicacion', 'distrito', 'provincia', 'direccion'];
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource<Ubicacion>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ubicacionService: UbicacionService = inject(UbicacionService);
  route : Router = inject(Router);

  constructor() {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){ //se ejecuta al cargar la página
    console.log("Llamando a mi API");
    this.ubicacionService.list().subscribe({
      next: data => {
        console.log("API me ha traido:", data);
        this.dataSource.data = data;
      }
    })
  }
}
