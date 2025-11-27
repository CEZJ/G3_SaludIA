import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpHeaders
import { Observable } from 'rxjs';
import { Sintoma } from '../model/sintoma';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/sintomas';

  constructor() { }

  // --- MÉTODO CLAVE: Genera las cabeceras con el Token ---
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Listar todos
  list(): Observable<Sintoma[]> {
    return this.http.get<Sintoma[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Insertar nuevo
  insert(sintoma: Sintoma): Observable<Sintoma> {
    return this.http.post<Sintoma>(this.apiUrl, sintoma, { headers: this.getHeaders() });
  }

  // Actualizar existente (ESTE ES EL QUE FALTABA)
  update(sintoma: Sintoma): Observable<Sintoma> {
    // Usamos el ID que venga disponible (id o idSintoma) para la URL
    const id = sintoma.id || sintoma.idSintoma;
    return this.http.put<Sintoma>(`${this.apiUrl}/${id}`, sintoma, { headers: this.getHeaders() });
  }

  // Eliminar por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Buscar por nombre
  buscarPorNombre(palabra: string): Observable<Sintoma[]> {
    return this.http.get<Sintoma[]>(`${this.apiUrl}/nombre/${palabra}`, { headers: this.getHeaders() });
  }
}
