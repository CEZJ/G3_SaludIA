import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admin-ubicaciones',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './admin-ubicaciones.html',
  styleUrls: ['./admin-ubicaciones.css']
})
export class AdminUbicaciones {

}
