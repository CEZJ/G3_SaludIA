import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sintoma } from '../model/sintoma'; // Tu modelo
import { Observable } from 'rxjs';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SintomaService {
  private url = environment.apiURL; // http://localhost:8080/api
  private httpClient = inject(HttpClient);
  private readonly TOKEN_KEY = 'jwt_token';

  // Helper para obtener el token y crear los headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return new HttpHeaders();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // Listar todos los síntomas
  list(): Observable<Sintoma[]> {
    return this.httpClient.get<Sintoma[]>(`${this.url}/sintomas`, {
      headers: this.getAuthHeaders()
    });
  }

  // Eliminar un síntoma por ID
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/sintomas/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // (Opcional) Crear un síntoma
  insert(sintoma: Sintoma) {
    return this.httpClient.post(`${this.url}/sintomas`, sintoma, {
      headers: this.getAuthHeaders()
    });
  }
}
