import { Component, OnInit } from '@angular/core';
import { GuardarEstudianteComponent } from '../guardar-estudiante/guardar-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import { Estudiante } from '../model/estudiante';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-gestionar-estudiantes',
  templateUrl: './gestionar-estudiantes.component.html',
  styleUrls: ['./gestionar-estudiantes.component.css']
})
export class GestionarEstudiantesComponent implements OnInit {

  constructor(
    private servicioTipoIdentificacion: TipoIdentificacionService,
    public dialog: MatDialog,
    private servicioEstudiantes: EstudianteService
    ) { }

  public estudiantes: Estudiante[]=[];

  ngOnInit(): void {
    this.listarEstudiante();
  }


  public modalNuevoEstudiante(id: number){
                                
                                //aca le pasamos el componente que vamos abrir
    let dialogRef = this.dialog.open(GuardarEstudianteComponent, {  
      height: '700px',
      width: '800px',
    });


  }

  private listarEstudiante(){
    this.servicioEstudiantes.listarTodos().subscribe( res=>{
      this.estudiantes = res;

    },error =>{
      console.log("Ha habido un error")
    })

  }




}
