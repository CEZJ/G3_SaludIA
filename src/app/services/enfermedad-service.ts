import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Enfermedad} from '../model/enfermedad';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnfermedadService {
  private http = inject(HttpClient);
  // Ajusta el puerto si es necesario (8080)
  private apiUrl = 'http://localhost:8080/api/enfermedades';

  constructor() { }

  list(): Observable<Enfermedad[]> {
    return this.http.get<Enfermedad[]>(this.apiUrl);
  }

  listId(id: number): Observable<Enfermedad> {
    return this.http.get<Enfermedad>(`${this.apiUrl}/${id}`);
  }

  insert(enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.post<Enfermedad>(this.apiUrl, enfermedad);
  }

  update(enfermedad: Enfermedad): Observable<Enfermedad> {
    return this.http.put<Enfermedad>(`${this.apiUrl}/${enfermedad.idEnfermedad}`, enfermedad);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
