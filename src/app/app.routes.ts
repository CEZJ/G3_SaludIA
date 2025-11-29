import { Routes } from '@angular/router';

// 1. IMPORTAR EL GUARD (Ajusta la ruta si 'guards' está en otra carpeta)
import { AuthGuard } from './guards/auth-guard';

// Importaciones de Componentes
import {UsuarioListarComponent} from './componente/ADMINISTRADOR/usuario-listar-component/usuario-listar-component';
import {RegisterComponent} from './componente/HOME/register-component/register-component';
import {InicioComponent} from './componente/HOME/inicio-component/inicio-component';
import {SintomaNuevoEditComponente} from './componente/USUARIO/sintoma-nuevo-edit-componente/sintoma-nuevo-edit-componente';
import {UbicacionListarComponent} from './componente/USUARIO/ubicacion-listar-component/ubicacion-listar-component';
import {SintomaListarComponente} from './componente/USUARIO/sintoma-listar-componente/sintoma-listar-componente';
import {LoginComponent} from './componente/HOME/login-component/login-component';
import {InicioUsuarioComponent} from './componente/USUARIO/inicio-usuario-component/inicio-usuario-component';
import {InicioAdminComponent} from './componente/ADMINISTRADOR/inicio-admin-component/inicio-admin-component';
import { AdminGestionarSintomasComponent } from './componente/ADMINISTRADOR/admin-gestionar-sintomas-component/admin-gestionar-sintomas-component';
import { AdminConfiguracionComponent } from './componente/ADMINISTRADOR/admin-configuracion-component/admin-configuracion-component';
import { AdminUbicacionesComponent } from './componente/ADMINISTRADOR/admin-ubicaciones-component/admin-ubicaciones-component';
import { HistorialDiagnosticoComponent } from './componente/USUARIO/historial-diagnostico-component/historial-diagnostico-component';
import {AjustesUsuarioComponent} from './componente/USUARIO/ajustes-usuario-component/ajustes-usuario-component';
import { DiagnosticoUsuarioComponent } from './componente/USUARIO/diagnostico-usuario-component/diagnostico-usuario-component';
import { AdminGestionarUsuariosComponent } from './componente/ADMINISTRADOR/admin-gestionar-usuarios-component/admin-gestionar-usuarios-component';
import { AdminGestionarEnfermedadesComponent } from './componente/ADMINISTRADOR/admin-gestionar-enfermedades-component/admin-gestionar-enfermedades-component';

export const routes: Routes = [

  /*---HOME (PÚBLICAS) ----*/
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},

  /*---RUTAS PROTEGIDAS (ADMIN O USUARIO SEGÚN LÓGICA) ---*/
  {
    path: 'usuarios',
    component: UsuarioListarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sintoma',
    component: SintomaListarComponente,
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevo-edit-sintoma',
    component: SintomaNuevoEditComponente,
    canActivate: [AuthGuard]
  },


  /*----USUARIO (PROTEGIDAS) -----*/
  {
    path: 'inicio-usuario',
    component: InicioUsuarioComponent,
    canActivate: [AuthGuard] // <--- Protección añadida
  },
  {
    path: 'diagnostico',
    component: DiagnosticoUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'historial',
    component: HistorialDiagnosticoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ajustes-usuario',
    component: AjustesUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicacion-usuario',
    component: UbicacionListarComponent,
    canActivate: [AuthGuard]
  },


  /*---ADMINISTRADOR (PROTEGIDAS) ----*/
  {
    path: 'inicio-admin',
    component: InicioAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-gestionar-usuarios-component',
    component: AdminGestionarUsuariosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-gestionar-sintomas-component',
    component: AdminGestionarSintomasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-gestionar-enfermedades-component',
    component: AdminGestionarEnfermedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-ubicaciones-component',
    component: AdminUbicacionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-configuracion-component',
    component: AdminConfiguracionComponent,
    canActivate: [AuthGuard]
  },
];
