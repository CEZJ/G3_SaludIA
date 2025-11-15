import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Usuario} from '../model/usuario'; // Asumimos que 'Usuario' es tu modelo de Perfil
import { Observable, tap } from 'rxjs'; // <-- ¡Importamos 'tap'!
import { Router } from '@angular/router'; // <-- ¡Importamos 'Router'!

// Esta es la forma del DTO que tu backend espera para el registro
export interface RegisterRequest {
  nombre: string;
  username: string; // El email
  password: string;
  fechaNacimiento: string; // Se enviará como YYYY-MM-DD
  distrito: string;
  provincia: string;
  direccion: string;
}

// --- Interfaz para el DTO de Login ---
export interface AuthRequest {
  username: string;
  password: string;
}

// --- Interfaz para la Respuesta del Login ---
export interface AuthResponse {
  jwt: string;
  roles: string[];
}


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  // URL Base: http://localhost:8080/api
  private url = environment.apiURL;

  // --- Inyección de dependencias ---
  private httpClient = inject(HttpClient);
  private router = inject(Router); // <-- ¡Router añadido!

  // --- Claves para localStorage ---
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLES_KEY = 'user_roles';

  // (Constructor vacío eliminado, 'inject' se encarga de todo)

  // --- MÉTODO DE LOGIN (MODIFICADO) ---
  login(credentials: AuthRequest): Observable<AuthResponse> {
    // Llama a /api/authenticate
    return this.httpClient.post<AuthResponse>(`${this.url}/authenticate`, credentials).pipe(
      // ¡AÑADIDO! Usamos 'tap' para guardar los datos sin interrumpir el flujo
      tap(response => {
        this.saveToken(response.jwt);
        this.saveRoles(response.roles);
      })
    );
  }

  // --- MÉTODO DE REGISTRO (Sin cambios) ---
  register(userData: RegisterRequest): Observable<any> {
    // Llama a /api/register
    return this.httpClient.post(`${this.url}/register`, userData, { responseType: 'text' });
  }

  // --- MÉTODOS CRUD DE PERFIL (Sin cambios) ---

  list(){
    // Ruta: http://localhost:8080/api/perfiles
    console.log(this.url + "/perfiles");
    return this.httpClient.get<Usuario[]>(`${this.url}/perfiles`);
  }

  listId(id:number){
    // Ruta: http://localhost:8080/api/perfil/1
    return this.httpClient.get<Usuario>(`${this.url}/perfil/${id}`);
  }

  insert(usuario: Usuario){
    // Ruta: http://localhost:8080/api/perfil
    console.log("Enviando Insert:",usuario);
    return this.httpClient.post(`${this.url}/perfil`, usuario);
  }

  update(usuario: Usuario){
    // Ruta: http://localhost:8080/api/perfil
    return this.httpClient.put(`${this.url}/perfil`, usuario);
  }

  delete(id:number){
    // Ruta: http://localhost:8080/api/perfil/1
    return this.httpClient.delete(`${this.url}/perfil/${id}`);
  }

  // --- ¡NUEVOS MÉTODOS DE MANEJO DE SESIÓN! ---

  /**
   * Guarda el token en localStorage
   */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Guarda los roles en localStorage (como un string JSON)
   */
  saveRoles(roles: string[]): void {
    localStorage.setItem(this.ROLES_KEY, JSON.stringify(roles));
  }

  /**
   * Obtiene el token de localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtiene los roles de localStorage
   */
  getRoles(): string[] {
    const roles = localStorage.getItem(this.ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }

  /**
   * Verifica si el usuario está logueado (si existe un token)
   */
  isLoggedIn(): boolean {
    return !!this.getToken(); // Devuelve true si el token existe
  }

  /**
   * Verifica si el usuario es Admin
   */
  isAdmin(): boolean {
    // Asegúrate de que el rol se llame 'ROLE_ADMIN' en tu backend
    return this.getRoles().includes('ROLE_ADMIN');
  }

  /**
   * Verifica si el usuario es un Usuario normal
   */
  isUser(): boolean {
    // Asegúrate de que el rol se llame 'ROLE_USER' en tu backend
    return this.getRoles().includes('ROLE_USER');
  }

  /**
   * Cierra la sesión, borra los datos de localStorage y redirige al login
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    this.router.navigate(['/login']);
  }
}
