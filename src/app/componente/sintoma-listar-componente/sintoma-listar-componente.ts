import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas

// --- 1. IMPORTA LOS MÓDULOS DE MATERIAL QUE FALTAN ---
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// (Probablemente también necesites tu servicio e interfaz de Sintoma)
// import { Sintoma } from '../../model/sintoma';
// import { SintomaService } from '../../services/sintoma-service';

@Component({
  selector: 'app-sintoma-listar-componente',
  standalone: true, // <-- Tu componente es standalone

  // --- 2. AÑADE LOS MÓDULOS AL ARRAY DE 'imports' ---
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    // (Añade aquí otros módulos que uses, como MatInputModule, MatButtonModule, etc.)
  ],
  templateUrl: './sintoma-listar-componente.html',
  styleUrls: ['./sintoma-listar-componente.css']
})
export class SintomaListarComponente implements OnInit {

  // --- 3. DECLARA LAS PROPIEDADES QUE EL HTML NECESITA ---

  // El HTML te pedía 'dataSource'
  // (Reemplaza 'any' con tu modelo, ej: MatTableDataSource<Sintoma>)
  dataSource = new MatTableDataSource<any>();

  // El HTML también te pedía 'displayedColumns'
  // (Ajusta los nombres para que coincidan con tus <ng-container matColumnDef="...">)
  displayedColumns: string[] = ['idSintoma', 'nombre'];

  // (Más adelante, necesitarás esto para conectar el paginador y el sort)
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(/* private sintomaService: SintomaService */) { }

  ngOnInit(): void {
    // Aquí es donde cargarías los datos
    /*
    this.sintomaService.list().subscribe(data => {
      this.dataSource.data = data;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
    */
  }
}
