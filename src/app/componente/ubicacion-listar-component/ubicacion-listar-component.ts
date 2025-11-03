import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {Ubicacion} from '../../model/ubicacion';
import {UbicacionService} from '../../services/ubicacion-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-ubicacion-listar-component',
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    //DatePipe,
    MatSortHeader
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
