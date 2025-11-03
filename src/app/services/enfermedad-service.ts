import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Enfermedad} from '../model/enfermedad';

@Injectable({
  providedIn: 'root',
})
export class EnfermedadService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  list(){
    console.log(this.url + "/enfermedades");
    return this.httpClient.get<Enfermedad[]>(this.url + "/enfermedades");
  }
  listId(id:number){
    return this.httpClient.get<Enfermedad>(this.url + "/enfermedad" + {id});
  }
  insert(enfermedad: Enfermedad){
    console.log("Enviando Insert:",enfermedad);
    return this.httpClient.post(this.url + "/enfermedad", enfermedad);
  }
  update(enfermedad: Enfermedad){
    return this.httpClient.put(this.url + "/enfermedad", enfermedad);
  }
  delete(id:number){
    return this.httpClient.delete(this.url + "/enfermedad" + {id});
  }
}
