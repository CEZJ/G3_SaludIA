import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Sintoma} from '../model/sintoma';

@Injectable({
  providedIn: 'root',
})
export class SintomaService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  list(){
    console.log(this.url + "/sintomas");
    return this.httpClient.get<Sintoma[]>(this.url + "/sintomas");
  }
  listId(id:number){
    return this.httpClient.get<Sintoma>(this.url + "/sintoma" + {id});
  }
  insert(sintoma: Sintoma){
    console.log("Enviando Insert:",sintoma);
    return this.httpClient.post(this.url + "/sintoma", sintoma);
  }
  update(sintoma: Sintoma){
    return this.httpClient.put(this.url + "/sintoma", sintoma);
  }
  delete(id:number){
    return this.httpClient.delete(this.url + "/sintoma" + {id});
  }
}
