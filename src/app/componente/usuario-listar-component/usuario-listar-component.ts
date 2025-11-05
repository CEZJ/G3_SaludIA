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
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-usuario-listar-component',
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
    DatePipe,
    MatSortHeader
  ],
  templateUrl: './usuario-listar-component.html',
  styleUrl: './usuario-listar-component.css',
})
export class UsuarioListarComponent {
  displayedColumns: string[] = ['idUsuario', 'nombre', 'fechaNacimiento', 'email', 'ubicacion'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usuarioService: UsuarioService = inject(UsuarioService);
  route : Router = inject(Router);
  constructor() {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){ //se ejecuta al cargar la página
    console.log("Llamando a mi API");
    this.usuarioService.list().subscribe({
      next: data => {
        console.log("API me ha traido:", data);
        this.dataSource.data = data;
      }
    })
  }
}
