import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';


@Injectable({
  providedIn: 'root'
})
export class EnfermedadEstudianteService {

  private path: string = environment.urlApi + '/enfermedad-estudiante'; // variable llamada path tipo string, ponemos enviroment donde se encuentra la url, le apuntamos al nombre de la api

  constructor( private http: HttpClient) { } //necesitamos que el http client haga las peticiones
  
  


   public listarTodos(){

    return this.http.get<EnfermedadEstudiante[]>(this.path) //obtenemos por medio del http el servicio de listar enfermedad estudiante


   }

   public registrar(entidad: EnfermedadEstudiante){

    return this.http.post<void>(this.path, entidad);

   }

   public listarEnfermedadesPorEstudiante(idEstudiante:number){
                       //va a devolver una lista y su url es
    return this.http.get<EnfermedadEstudiante[]>(`${this.path}/listarEnfermedadPorEstudiante/${idEstudiante}`);

   }



}
