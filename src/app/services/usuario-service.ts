import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Usuario} from '../model/usuario';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  constructor() {}
  list(){
    console.log(this.url + "/usuarios");
    return this.httpClient.get<Usuario[]>(this.url + "/usuarios");
  }
  listId(id:number){
    return this.httpClient.get<Usuario>(this.url + "/usuario" + {id});
  }
  insert(usuario: Usuario){
    console.log("Enviando Insert:",usuario);
    return this.httpClient.post(this.url + "/usuario", usuario);
  }
  update(usuario: Usuario){
    return this.httpClient.put(this.url + "/usuario", usuario);
  }
  delete(id:number){
    return this.httpClient.delete(this.url + "/usuario" + {id});
  }
}
