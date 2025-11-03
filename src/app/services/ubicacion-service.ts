import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Ubicacion} from '../model/ubicacion';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  list(){
    console.log(this.url + "/ubicaciones");
    return this.httpClient.get<Ubicacion[]>(this.url + "/ubicaciones");
  }
  listId(id:number){
    return this.httpClient.get<Ubicacion>(this.url + "/ubicacion" + {id});
  }
  insert(ubicacion: Ubicacion){
    console.log("Enviando Insert:",ubicacion);
    return this.httpClient.post(this.url + "/ubicacion", ubicacion);
  }
  update(ubicacion: Ubicacion){
    return this.httpClient.put(this.url + "/ubicacion", ubicacion);
  }
  delete(id:number){
    return this.httpClient.delete(this.url + "/usuario" + {id});
  }
}
