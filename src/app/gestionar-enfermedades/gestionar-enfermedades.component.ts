import { Component, OnInit } from '@angular/core';
import { GuardarEnfermedadesComponent } from '../guardar-enfermedades/guardar-enfermedades.component';
import {MatDialog} from '@angular/material/dialog';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';
import { EnfermedadEstudianteService } from '../services/enfermedad-estudiante.service';
import { FormControl } from '@angular/forms';
import { Estudiante } from '../model/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-enfermedades',
  templateUrl: './gestionar-enfermedades.component.html',
  styleUrls: ['./gestionar-enfermedades.component.css']
})
export class GestionarEnfermedadesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public servicioEnfermedad: EnfermedadEstudianteService,
    public servicioEstudiante: EstudianteService,
    private router: Router
    
   
  ) { }

  public idEstudiante: FormControl = new FormControl()
  public estudiantes: Estudiante[]=[]
  public enfermedades: EnfermedadEstudiante[]=[]

  ngOnInit(): void {
    this.listarEnfermedades()
    this.cargarEstudiante()
  }

  public openModalEnfermedad(){

    let dialogRef = this.dialog.open(GuardarEnfermedadesComponent, {  
      height: '500px',
      width: '700px',

   
  
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.listarEnfermedades
      }
    })

  }

  private listarEnfermedades(){

    this.servicioEnfermedad.listarTodos().subscribe(res=>{
      this.enfermedades= res;
    })

  }

  private cargarEstudiante(){
    this.servicioEstudiante.listarTodos().subscribe(res=>{
      this.estudiantes= res;
    })
  }

  public filtrar(){

    this.servicioEnfermedad.listarPorIdEstudiante(this.idEstudiante.value).subscribe(res=>{
      this.enfermedades = res;
    }, error=>{
      console.log("Ha ocurrido un error con el filtro");

    }
    

    

    )



  }

  public logout(){
    localStorage.removeItem('token');

    // Redirigimos al usuario a la página de login
    this.router.navigate(['/login']);

  }

}
