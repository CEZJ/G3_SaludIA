import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admin-gestionar-enfermedades-component',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './admin-gestionar-enfermedades-component.html',
  styleUrls: ['./admin-gestionar-enfermedades-component.css']
})
export class AdminGestionarEnfermedadesComponent {

}
