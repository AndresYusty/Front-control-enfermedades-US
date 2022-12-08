import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../model/estudiante';
import { MatDialogRef } from '@angular/material/dialog';
import { EstudianteService } from '../services/estudiante.service';
import { EnfermedadEstudianteService } from '../services/enfermedad-estudiante.service';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';


@Component({
  selector: 'app-guardar-enfermedades',
  templateUrl: './guardar-enfermedades.component.html',
  styleUrls: ['./guardar-enfermedades.component.css']
})
export class GuardarEnfermedadesComponent implements OnInit {

  public formEnfermedad!: FormGroup; 

  public listaEstudiantes: Estudiante[]=[] //creamos la lista que recorremos en el html

  constructor(
    private servicioEstudiante: EstudianteService,
    private servicioEnfermedad: EnfermedadEstudianteService,
    public dialogRef: MatDialogRef<GuardarEnfermedadesComponent>
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEstudiantes();
  }

  private inicializarFormulario(){
    this.formEnfermedad = new FormGroup({
      idEstudiante: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      observacion: new FormControl(null, Validators.required),
    });
  }


  private cargarEstudiantes() {
    this.servicioEstudiante.listarTodos().subscribe(res => {
      this.listaEstudiantes = res;
    }, error => {
      console.log("Ha ocurrido un error al cargar los estudiantes");
    });
  }


 
  public guardar() {
    let estudiante: Estudiante = new Estudiante();
    estudiante.id = this.formEnfermedad.controls['idEstudiante'].value;

    let enfermedadEstudiante: EnfermedadEstudiante = new EnfermedadEstudiante();
    enfermedadEstudiante.estudiante = estudiante;
    enfermedadEstudiante.nombre = this.formEnfermedad.controls['nombre'].value;
    enfermedadEstudiante.observacion= this.formEnfermedad.controls['observacion'].value

    this.servicioEnfermedad.registrar(enfermedadEstudiante).subscribe(res=>{
      alert("Se ha guardado correctamente")
      this.dialogRef.close(true);
      this.cargarEstudiantes();

    })

   



  }

}
