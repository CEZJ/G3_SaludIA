import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../model/usuario'; // Tu modelo actualizado con Ubicacion
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// --- Interfaces para Auth ---
export interface AuthRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  jwt: string;
  roles: string[];
}

// --- DTO para Registro (CORREGIDO) ---
// Lo actualizamos a estructura anidada para que coincida con tu formulario
// y con tu modelo de Usuario/Ubicacion.
export interface RegisterRequest {
  nombre: string;
  username: string;
  password: string;
  fechaNacimiento: string;
  // Objeto anidado
  ubicacion: {
    distrito: string;
    provincia: string;
    direccion: string;
  };
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

  // --- LOGIN ---
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.url}/authenticate`, credentials).pipe(
      tap(response => {
        this.saveToken(response.jwt);
        this.saveRoles(response.roles);
      })
    );
  }

  // --- REGISTER ---
  // Ahora acepta el objeto con ubicación anidada
  register(userData: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.url}/register`, userData, { responseType: 'text' });
  }

  // --- LISTAR USUARIOS ---
  list(): Observable<Usuario[]> {
    const headers = this.getAuthHeaders();
    // Espera un array de 'Usuario', que ahora incluye la propiedad 'ubicacion'
    return this.httpClient.get<Usuario[]>(`${this.url}/perfiles`, { headers });
  }

  // --- OTROS MÉTODOS CRUD ---
  listId(id: number) {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<Usuario>(`${this.url}/perfiles/${id}`, { headers });
  }

  insert(usuario: Usuario) {
    const headers = this.getAuthHeaders();
    return this.httpClient.post(`${this.url}/perfiles`, usuario, { headers });
  }

  update(usuario: Usuario) {
    const headers = this.getAuthHeaders();
    return this.httpClient.put(`${this.url}/perfiles/${usuario.idUsuario}`, usuario, { headers });
  }

  delete(id: number) {
    const headers = this.getAuthHeaders();
    return this.httpClient.delete(`${this.url}/perfiles/${id}`, { headers });
  }

  // --- HELPERS DE SESIÓN ---
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) return new HttpHeaders();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  saveToken(token: string): void { localStorage.setItem(this.TOKEN_KEY, token); }
  saveRoles(roles: string[]): void { localStorage.setItem(this.ROLES_KEY, JSON.stringify(roles)); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }

  getRoles(): string[] {
    const r = localStorage.getItem(this.ROLES_KEY);
    return r ? JSON.parse(r) : [];
  }

  isLoggedIn(): boolean { return !!this.getToken(); }
  isAdmin(): boolean { return this.getRoles().includes('ROLE_ADMIN'); }
  isUser(): boolean { return this.getRoles().includes('ROLE_USER'); }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLES_KEY);
    this.router.navigate(['/login']);
  }
}
