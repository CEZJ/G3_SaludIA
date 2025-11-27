import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enfermedad } from '../model/enfermedad';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private http = inject(HttpClient);
  // Asegúrate de que este puerto sea el correcto (8080)
  private apiUrl = 'http://localhost:8080/api/enfermedades';

  constructor() { }

  // --- MÉTODO CLAVE: PREPARAR EL PASE DE SEGURIDAD ---
  private createHeaders() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('⚠️ NO HAY TOKEN: Es probable que recibas un error 403. Por favor inicia sesión.');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Aquí va la llave maestra
      })
    };
  }

  // --- MÉTODOS PÚBLICOS (Usando createHeaders) ---

  list(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(this.apiUrl, this.createHeaders());
  }

  listId(id: number): Observable<Enfermedad> {
    return this.http.get<Enfermedad>(`${this.apiUrl}/${id}`, this.createHeaders());
  }

  insert(enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.post<Enfermedad>(this.apiUrl, enfermedad, this.createHeaders());
  }

  update(enfermedad: Enfermedad): Observable<Enfermedad> {
    // Asegúrate de que el endpoint de update en tu backend coincida (ej. PUT /api/enfermedades/{id})
    // Si tu backend usa PUT /api/enfermedades para actualizar enviando el ID en el cuerpo, ajusta esta línea.
    return this.http.put<Enfermedad>(`${this.apiUrl}/${enfermedad.idEnfermedad || enfermedad.id}`, enfermedad, this.createHeaders());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.createHeaders());
  }
}
