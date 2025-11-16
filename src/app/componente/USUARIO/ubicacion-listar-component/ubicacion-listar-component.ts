import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTableModule // Añadido para agrupar las directivas de tabla, aunque la lista individual funciona.
} from '@angular/material/table';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {Ubicacion} from '../../../model/ubicacion';
import {UbicacionService} from '../../../services/ubicacion-service';
import {Router} from '@angular/router';

// IMPORTS CORREGIDOS: Debes importar el MÓDULO, no la directiva individual.
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Agregado para DatePipe si lo usaras
import { MatInputModule } from '@angular/material/input'; // Útil si añades filtros/inputs
import { MatButtonModule } from '@angular/material/button'; // Útil si añades botones

@Component({
  selector: 'app-ubicacion-listar-component',
  standalone: true, // Asumo que es standalone ya que usa el array 'imports'
  imports: [
    // Módulos correctos de Angular Material
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule, // Usado para el contenedor de la tabla
    MatIconModule,  // Usado para MatIcon
    MatInputModule,
    MatButtonModule,

    // Módulo de Angular
    CommonModule,
    // Si usas DatePipe, descomentar la línea de abajo y comentar la de arriba
    // DatePipe, // <- Si lo usas como pipe en el template, debe ir aquí o en CommonModule

    // Si quieres usar las directivas individualmente (solo si no usas los Módulos de arriba):
    // MatTable, MatSort, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell,
    // MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator,
    // MatSortHeader, MatCard, MatIcon
  ],
  templateUrl: './ubicacion-listar-component.html',
  styleUrl: './ubicacion-listar-component.css',
})
export class UbicacionListarComponent {
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
