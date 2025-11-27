import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // 1. Inyectar el Router en el constructor
  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    // 2. Verificar si existe el token
    if (token != null) {
      // Retorna 'true' para permitir el acceso si el token existe
      return true;
    } else {
      // Mensaje de alerta (puedes cambiarlo por un snackBar luego si prefieres)
      alert("No accesible! Debes iniciar sesión.");

      // 3. Si no hay token, redirigir al usuario al login
      this.router.navigate(['/login']);

      // Retorna 'false' para negar el acceso a la ruta solicitada
      return false;
    }
  }
}
