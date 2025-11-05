import { Routes } from '@angular/router';
import {UsuarioListarComponent} from './componente/usuario-listar-component/usuario-listar-component';
import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
import {AcercaComponent} from './componente/acerca-component/acerca-component';
import {InicioComponent} from './componente/inicio-component/inicio-component';
import {SintomaNuevoEditComponente} from './componente/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';
import {UbicacionListarComponent} from './componente/ubicacion-listar-component/ubicacion-listar-component';
import {SintomaListarComponente} from './componente/sintoma-listar-componente/sintoma-listar-componente';
import {LoginComponent} from './componente/login-component/login-component';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'ubicacion', component: UbicacionListarComponent},
  { path: 'usuarios', component: UsuarioListarComponent},
  { path: 'nuevo-edit', component: UsuarioNuevoEditComponent},
  { path: 'sintoma', component: SintomaListarComponente},
  { path: 'nuevo-edit-sintoma', component: SintomaNuevoEditComponente},
  { path: 'acerca', component: AcercaComponent},
  { path: 'login', component: LoginComponent},
];
