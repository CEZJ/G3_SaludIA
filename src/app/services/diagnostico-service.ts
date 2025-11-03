import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Diagnostico} from '../model/diagnostico';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticoService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  list(){
    console.log(this.url + "/diagnosticos");
    return this.httpClient.get<Diagnostico[]>(this.url + "/diagnosticos");
  }
  listId(id:number){
    return this.httpClient.get<Diagnostico>(this.url + "/diagnostico" + {id});
  }
  insert(diagnostico: Diagnostico){
    console.log("Enviando Insert:",diagnostico);
    return this.httpClient.post(this.url + "/diagnostico", diagnostico);
  }
  update(diagnostico: Diagnostico){
    return this.httpClient.put(this.url + "/diagnostico", diagnostico);
  }
  delete(id:number){
    return this.httpClient.delete(this.url + "/diagnostico" + {id});
  }
}
