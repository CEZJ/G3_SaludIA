import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Usuario} from '../model/usuario'; // <-- ¡Usamos tu modelo Usuario!
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// --- Tus Interfaces ---
export interface RegisterRequest {
  nombre: string;
  username: string; // El email
  password: string;
  fechaNacimiento: string; // Se enviará como YYYY-MM-DD
  distrito: string;
  provincia: string;
  direccion: string;
}
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  jwt: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLES_KEY = 'user_roles';

  // --- MÉTODO DE LOGIN (Sin cambios) ---
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.url}/authenticate`, credentials).pipe(
      tap(response => {
        this.saveToken(response.jwt);
        this.saveRoles(response.roles);
      })
    );
  }

  // --- MÉTODO DE REGISTRO (Sin cambios) ---
  register(userData: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, userData, { responseType: 'text' });
  }

  // --- MÉTODOS CRUD DE PERFIL ---

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      return new HttpHeaders();
    }
    // Si hay token, lo añade a la cabecera 'Authorization'
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // --- ¡CORRECCIÓN CLAVE! ---
  // Ahora el método list() devuelve un Observable de Usuario[]
  list(): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    // Le pedimos a HttpClient que espere un array de Usuario
    return this.httpClient.get<Usuario[]>(`${this.url}/perfiles`, { headers: headers });
  }

  listId(id:number){
    const headers = this.getAuthHeaders();
    return this.httpClient.get<Usuario>(`${this.url}/perfiles/${id}`, { headers: headers });
  }

  insert(usuario: Usuario){
    const headers = this.getAuthHeaders();
    console.log("Enviando Insert:",usuario);
    // NOTA: Tu controller espera 'PerfilDTO' aquí, no 'Perfil' (Usuario).
    // Deberías ajustar esto en tu backend.
    return this.httpClient.post(`${this.url}/perfiles`, usuario, { headers: headers });
  }

  update(usuario: Usuario){
    const headers = this.getAuthHeaders();
    // Tu controller espera 'Perfil' aquí, así que esto está bien.
    return this.httpClient.put(`${this.url}/perfiles/${usuario.idUsuario}`, usuario, { headers: headers });
  }

  delete(id:number){
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.url}/perfiles/${id}`, { headers: headers });
  }

  // --- MÉTODOS DE MANEJO DE SESIÓN (Sin cambios) ---
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveRoles(roles: string[]): void {
    localStorage.setItem(this.ROLES_KEY, JSON.stringify(roles));
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getRoles(): string[] {
    const roles = localStorage.getItem(this.ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }
  isUser(): boolean {
    return this.getRoles().includes('ROLE_USER');
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    this.router.navigate(['/login']);
  }
}
