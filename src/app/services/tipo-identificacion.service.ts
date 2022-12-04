import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoIdentificacion } from '../model/tipo-identificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {


  private path: string= environment.urlApi+'/tipo-identificacion';


  constructor(private http: HttpClient) { }

  listarTodos(){
    return this.http.get<TipoIdentificacion[]>(this.path);
  }
}
