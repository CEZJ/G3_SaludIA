import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-sintoma-nuevo-edit-componente',
  imports: [MatCheckboxModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './sintoma-nuevo-edit-componente.html',
  styleUrl: './sintoma-nuevo-edit-componente.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SintomaNuevoEditComponente {
}
