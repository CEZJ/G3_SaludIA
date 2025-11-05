import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Usuario} from '../model/usuario'; // Asumimos que 'Usuario' es tu modelo de Perfil
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  // URL Base: http://localhost:8080/api
  private url = environment.apiURL;

  private httpClient = inject(HttpClient);
  constructor() {}

  // --- MÉTODO DE REGISTRO (Endpoint público) ---
  register(userData: RegisterRequest): Observable<any> {
    // Llama a /api/register y espera una respuesta de TEXTO
    // Ruta: http://localhost:8080/api/register
    return this.httpClient.post(`${this.url}/register`, userData, { responseType: 'text' });
  }

  // --- MÉTODOS CRUD DE PERFIL (Endpoints protegidos) ---

  list(){
    // Ruta: http://localhost:8080/api/perfiles
    console.log(this.url + "/perfiles");
    return this.httpClient.get<Usuario[]>(`${this.url}/perfiles`);
  }

  listId(id:number){
    // Ruta: http://localhost:8080/api/perfil/1
    return this.httpClient.get<Usuario>(`${this.url}/perfil/${id}`);
  }

  insert(usuario: Usuario){ // Asumimos que tu modelo 'Usuario' es el Perfil
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
}
