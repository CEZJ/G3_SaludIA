import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ubicacion } from '../model/ubicacion'; // Asegúrate de tener este modelo
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private url = environment.apiURL; // http://localhost:8080/api
  private httpClient = inject(HttpClient);
  private readonly TOKEN_KEY = 'jwt_token';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return new HttpHeaders();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // Listar todas las ubicaciones
  list(): Observable<Ubicacion[]> {
    return this.httpClient.get<Ubicacion[]>(`${this.url}/ubicaciones`, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar ubicación
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/ubicaciones/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Insertar y Actualizar (opcionales por ahora)
  insert(ubicacion: Ubicacion) {
    return this.httpClient.post(`${this.url}/ubicaciones`, ubicacion, { headers: this.getAuthHeaders() });
  }
}
