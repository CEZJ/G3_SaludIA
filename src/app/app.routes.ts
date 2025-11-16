  import { Routes } from '@angular/router';
  import {UsuarioListarComponent} from './componente/USUARIO/usuario-listar-component/usuario-listar-component';
  import {UsuarioNuevoEditComponent} from './componente/USUARIO/usuario-nuevo-edit-component/usuario-nuevo-edit-component';
  import {NosotrosComponent} from './componente/HOME/nosotros-component/nosotros-component';
  import {InicioComponent} from './componente/HOME/inicio-component/inicio-component';
  import {SintomaNuevoEditComponente} from './componente/USUARIO/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';
  import {UbicacionListarComponent} from './componente/USUARIO/ubicacion-listar-component/ubicacion-listar-component';
  import {SintomaListarComponente} from './componente/USUARIO/sintoma-listar-componente/sintoma-listar-componente';
  import {LoginComponent} from './componente/HOME/login-component/login-component';
  import {InicioUsuarioComponent} from './componente/USUARIO/inicio-usuario-component/inicio-usuario-component';
  import {DiagnosticoComponent} from './componente/USUARIO/diagnostico-usuario-component/diagnostico-usuario-component';

  import {InicioAdminComponent} from './componente/ADMINISTRADOR/inicio-admin-component/inicio-admin-component';

  import { GestionarUsuariosComponent } from './componente/ADMINISTRADOR/admin-gestionar-usuarios/admin-gestionar-usuarios';
  import { AdminGestionarSintomas } from './componente/ADMINISTRADOR/admin-gestionar-sintomas/admin-gestionar-sintomas';
  import { AdminGestionarEnfermedades } from './componente/ADMINISTRADOR/admin-gestionar-enfermedades/admin-gestionar-enfermedades';
  import { AdminConfiguracion } from './componente/ADMINISTRADOR/admin-configuracion/admin-configuracion';
  import { AdminUbicaciones } from './componente/ADMINISTRADOR/admin-ubicaciones/admin-ubicaciones';






  export const routes: Routes = [

            /*---HOME----*/
    { path: '', component: InicioComponent, pathMatch: 'full' },

    { path: 'usuarios', component: UsuarioListarComponent},
    { path: 'usuario-nuevo-edit', component: UsuarioNuevoEditComponent},
    { path: 'sintoma', component: SintomaListarComponente},
    { path: 'nuevo-edit-sintoma', component: SintomaNuevoEditComponente},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'login', component: LoginComponent},


          /*----USUARIO-----*/
    { path: 'inicio-usuario', component: InicioUsuarioComponent},
    { path: 'diagnostico', component: DiagnosticoComponent},
    { path: 'ubicacion-usuario', component: UbicacionListarComponent},


           /*---ADMINISTRADOR----*/

    { path: 'inicio-admin', component: InicioAdminComponent},
    { path: 'admin-gestionar-usuarios', component: GestionarUsuariosComponent },
    { path: 'admin-gestionar-sintomas', component: AdminGestionarSintomas },
    { path: 'admin-gestionar-enfermedades', component: AdminGestionarEnfermedades },
    { path: 'admin-ubicaciones', component: AdminUbicaciones },
    { path: 'admin-configuracion', component: AdminConfiguracion },



  ];
