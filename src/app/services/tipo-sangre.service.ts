import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoSangre } from '../model/tipo-sangre';

@Injectable({
  providedIn: 'root'
})
export class TipoSangreService {

   private path: string= environment.urlApi+'/tipo-sangre'


  constructor(private http: HttpClient) { }
   

  public ListarTodos( ){
      
    return this.http.get<TipoSangre[]>(this.path);
    
  }




}
