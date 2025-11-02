import { Routes } from '@angular/router';
import {UsuarioListarComponent} from './componente/usuario-listar-component/usuario-listar-component';
import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
import {AcercaComponent} from './componente/acerca-component/acerca-component';
import {InicioComponent} from './componente/inicio-component/inicio-component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'usuarios', component: UsuarioListarComponent},
  { path: 'nuevo-edit', component: UsuarioNuevoEditComponent},
  { path: 'nuevo-edit/:id', component: UsuarioNuevoEditComponent},
  { path: 'acerca', component: AcercaComponent},
];
