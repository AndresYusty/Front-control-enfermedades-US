import { Component, OnInit } from '@angular/core';
import { GuardarEstudianteComponent } from '../guardar-estudiante/guardar-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import { Estudiante } from '../model/estudiante';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';
import { EstudianteService } from '../services/estudiante.service';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-estudiantes',
  templateUrl: './gestionar-estudiantes.component.html',
  styleUrls: ['./gestionar-estudiantes.component.css']
})
export class GestionarEstudiantesComponent implements OnInit {

  constructor(
    private servicioTipoIdentificacion: TipoIdentificacionService,
    public dialog: MatDialog,
    private servicioEstudiantes: EstudianteService,
    private router: Router
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

      //cuando abrimos por medio del dialog tambien recibimos un id con data
      data: {
        id:id,
      }
      
  
    });

    //despues de cerrado el componente me hace la peticion de listar los estudiante nuevamente
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.listarEstudiante();
      }

    },error=>{
      console.log("NO se ha podido recargar los estudiante")
    })

   

  }

  private listarEstudiante(){
    this.servicioEstudiantes.listarTodos().subscribe( res=>{
      this.estudiantes = res;

    },error =>{
      console.log("Ha habido un error")
    })

  }


  public eliminar(id:number){
    let dialogRef = this.dialog.open(ConfirmarEliminarComponent, {  
      height: '180px',
      width: '400px',
  
    })

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.servicioEstudiantes.eliminar(id).subscribe( res=>{

          alert("Se ha eliminado el estudiante")
          this.listarEstudiante();
        }
          
        )

      }
    })


  }

  public logout(){
    localStorage.removeItem('token');

    // Redirigimos al usuario a la página de login
    this.router.navigate(['/login']);

  }




}