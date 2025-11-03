import { Routes } from '@angular/router';
import { UbicacionListarComponente} from './componente/ubicacion-listar-componente/ubicacion-listar-componente';
import {UbicacionNuevoEditComponente} from './componente/ubicacion-nuevo-edit-componente/ubicacion-nuevo-edit-componente';
import {UsuarioListarComponent} from './componente/usuario-listar-component/usuario-listar-component';
import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
import {AcercaComponent} from './componente/acerca-component/acerca-component';
import {InicioComponent} from './componente/inicio-component/inicio-component';
import {SintomaListarComponente} from './componente/sintoma-listar-componente/sintoma-listar-componente';
import {SintomaNuevoEditComponente} from './componente/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';

export const routes: Routes = [
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'ubicacion', component: UbicacionListarComponente},
  { path: 'nuevo-edit-ubicacion', component: UbicacionNuevoEditComponente},
  { path: 'usuarios', component: UsuarioListarComponent},
  { path: 'nuevo-edit', component: UsuarioNuevoEditComponent},
  { path: 'sintoma', component: SintomaListarComponente},
  { path: 'nuevo-edit-sintoma', component: SintomaNuevoEditComponente},
  { path: 'acerca', component: AcercaComponent},
];
