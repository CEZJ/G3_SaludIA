  import { Routes } from '@angular/router';
  import {UsuarioListarComponent} from './componente/usuario-listar-component/usuario-listar-component';
  import {UsuarioNuevoEditComponent} from './componente/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
  import {NosotrosComponent} from './componente/nosotros-component/nosotros-component';
  import {InicioComponent} from './componente/inicio-component/inicio-component';
  import {SintomaNuevoEditComponente} from './componente/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';
  import {UbicacionListarComponent} from './componente/ubicacion-listar-component/ubicacion-listar-component';
  import {SintomaListarComponente} from './componente/sintoma-listar-componente/sintoma-listar-componente';
  import {LoginComponent} from './componente/login-component/login-component';
  import {InicioUsuarioComponent} from './componente/inicio-usuario-component/inicio-usuario-component';
  import {DiagnosticoComponent} from './componente/diagnostico-usuario-component/diagnostico-usuario-component';

  import {InicioAdminComponent} from './componente/inicio-admin-component/inicio-admin-component';

  import { GestionarUsuariosComponent } from './componente/admin-gestionar-usuarios/admin-gestionar-usuarios';
  import { AdminGestionarSintomas } from './componente/admin-gestionar-sintomas/admin-gestionar-sintomas';
  import { AdminGestionarEnfermedades } from './componente/admin-gestionar-enfermedades/admin-gestionar-enfermedades';
  import { AdminConfiguracion } from './componente/admin-configuracion/admin-configuracion';
  import { AdminUbicaciones } from './componente/admin-ubicaciones/admin-ubicaciones';






  export const routes: Routes = [
    { path: '', component: InicioComponent, pathMatch: 'full' },
    { path: 'ubicacion', component: UbicacionListarComponent},
    { path: 'usuarios', component: UsuarioListarComponent},
    { path: 'usuario-nuevo-edit', component: UsuarioNuevoEditComponent},
    { path: 'sintoma', component: SintomaListarComponente},
    { path: 'nuevo-edit-sintoma', component: SintomaNuevoEditComponente},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'login', component: LoginComponent},
    { path: 'inicio-usuario', component: InicioUsuarioComponent},
    { path: 'diagnostico', component: DiagnosticoComponent},

    { path: 'inicio-admin', component: InicioAdminComponent},



    { path: 'admin-gestionar-usuarios', component: GestionarUsuariosComponent },
    { path: 'admin-gestionar-sintomas', component: AdminGestionarSintomas },
    { path: 'admin-gestionar-enfermedades', component: AdminGestionarEnfermedades },
    { path: 'admin-ubicaciones', component: AdminUbicaciones },
    { path: 'admin-configuracion', component: AdminConfiguracion },



  ];
