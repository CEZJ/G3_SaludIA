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
import {Sintoma} from '../../../model/sintoma';
import {SintomaService} from '../../../services/sintoma-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-sintoma-listar-componente',
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
  templateUrl: './sintoma-listar-componente.html',
  styleUrl: './sintoma-listar-componente.css',
})
export class SintomaListarComponente {
  displayedColumns: string[] = ['idSintoma', 'nombre'];
  dataSource: MatTableDataSource<Sintoma> = new MatTableDataSource<Sintoma>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sintomaService: SintomaService = inject(SintomaService);
  route : Router = inject(Router);
  constructor() {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){ //se ejecuta al cargar la página
    console.log("Llamando a mi API");
    this.sintomaService.list().subscribe({
      next: data => {
        console.log("API me ha traido:", data);
        this.dataSource.data = data;
      }
    })
  }
}
