import { Routes } from '@angular/router';
import {Usuario} from './model/usuario';
import {UsuarioListarComponent} from './componente/usuario-listar-component/usuario-listar-component';
import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
import {AcercaComponent} from './componente/acerca-component/acerca-component';

export const routes: Routes = [
  { path: '', component: Usuario, pathMatch: 'full' },
  { path: 'usuarios', component: UsuarioListarComponent},
  { path: 'nuevo-edit', component: UsuarioNuevoEditComponent},
  { path: 'nuevo-edit/:id', component: UsuarioNuevoEditComponent},
  { path: 'acerca', component: AcercaComponent},
];
