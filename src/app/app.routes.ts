  import { Routes } from '@angular/router';
  import {UsuarioListarComponent} from './componente/ADMINISTRADOR/usuario-listar-component/usuario-listar-component';
  import {RegisterComponent} from './componente/USUARIO/register-component/register-component';
  import {InicioComponent} from './componente/HOME/inicio-component/inicio-component';
  import {SintomaNuevoEditComponente} from './componente/USUARIO/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';
  import {UbicacionListarComponent} from './componente/ADMINISTRADOR/ubicacion-listar-component/ubicacion-listar-component';
  import {SintomaListarComponente} from './componente/USUARIO/sintoma-listar-componente/sintoma-listar-componente';
  import {LoginComponent} from './componente/HOME/login-component/login-component';
  import {InicioUsuarioComponent} from './componente/USUARIO/inicio-usuario-component/inicio-usuario-component';


  import {InicioAdminComponent} from './componente/ADMINISTRADOR/inicio-admin-component/inicio-admin-component';


  import { AdminGestionarSintomasComponent } from './componente/ADMINISTRADOR/admin-gestionar-sintomas-component/admin-gestionar-sintomas-component';
  import { AdminGestionarEnfermedades } from './componente/ADMINISTRADOR/admin-gestionar-enfermedades/admin-gestionar-enfermedades';
  import { AdminConfiguracionComponent } from './componente/ADMINISTRADOR/admin-configuracion-component/admin-configuracion-component';
  import { AdminUbicacionesComponent } from './componente/ADMINISTRADOR/admin-ubicaciones-component/admin-ubicaciones-component';
  import {
    HistorialDiagnosticoComponent
  } from './componente/USUARIO/historial-diagnostico-component/historial-diagnostico-component';
  import {AjustesUsuarioComponent} from './componente/USUARIO/ajustes-usuario-component/ajustes-usuario-component';
  import {
    DiagnosticoUsuarioComponent
  } from './componente/USUARIO/diagnostico-usuario-component/diagnostico-usuario-component';
  import {
    AdminGestionarUsuariosComponent
  } from './componente/ADMINISTRADOR/admin-gestionar-usuarios-component/admin-gestionar-usuarios-component';








  export const routes: Routes = [

            /*---HOME----*/
    { path: '', component: InicioComponent, pathMatch: 'full' },

    { path: 'usuarios', component: UsuarioListarComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'sintoma', component: SintomaListarComponente},
    { path: 'nuevo-edit-sintoma', component: SintomaNuevoEditComponente},
    { path: 'login', component: LoginComponent},


          /*----USUARIO-----*/
    { path: 'inicio-usuario', component: InicioUsuarioComponent},
    { path: 'diagnostico', component: DiagnosticoUsuarioComponent},
    { path: 'historial', component: HistorialDiagnosticoComponent},
    { path: 'ajustes-usuario', component: AjustesUsuarioComponent},
    { path: 'ubicacion-usuario', component: UbicacionListarComponent},


           /*---ADMINISTRADOR----*/

    { path: 'inicio-admin', component: InicioAdminComponent},
    { path: 'admin-gestionar-usuarios-component', component: AdminGestionarUsuariosComponent },
    { path: 'admin-gestionar-sintomas-component', component: AdminGestionarSintomasComponent },
    { path: 'admin-gestionar-enfermedades', component: AdminGestionarEnfermedades },
    { path: 'admin-ubicaciones-component', component: AdminUbicacionesComponent },
    { path: 'admin-configuracion-component', component: AdminConfiguracionComponent },



  ];
