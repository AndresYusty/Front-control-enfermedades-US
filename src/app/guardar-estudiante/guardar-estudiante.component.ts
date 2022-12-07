import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../model/estudiante';
import { TipoIdentificacion } from '../model/tipo-identificacion';
import { TipoSangre } from '../model/tipo-sangre';
import { EstudianteService } from '../services/estudiante.service';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';
import { TipoSangreService } from '../services/tipo-sangre.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-guardar-estudiante',
  templateUrl: './guardar-estudiante.component.html',
  styleUrls: ['./guardar-estudiante.component.css']
})
export class GuardarEstudianteComponent implements OnInit {

  public formEstudiante!: FormGroup; //creamos formEstudiante de tipo FormGroup ya que vamos a trabajar con formularios

  public selectTipoIdentificacion: TipoIdentificacion[] = []; //Lista del select para tipo de identificacion

  public selectTipoSangre: TipoSangre[]=[];  //Lista del select para tipo sangre 

  constructor( //inyecciones de servicios

    private servicioTipoIdentificacion: TipoIdentificacionService, //inyectamos los servicios para cargar las listar en los select
    private servicioTipoSangre: TipoSangreService,
    private servicioEstudiante: EstudianteService,
    public dialogRef: MatDialogRef<GuardarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {


    this.inicializarEstudiante(); //cuando inicie el componente vamos a llamar al metodo
    this.cargarTipoIdentificacion();
    this.cargarTipoSangre();
    this.cargarDatosEstudiante();

  }

  private inicializarEstudiante(){

    this.formEstudiante = new FormGroup({
      // inicializamos el formulario con los atributos, el valor inicialmente va a ser null pero requerido                                   
      idTipoIdentificacion: new FormControl(null, Validators.required),
      numeroIdentificacion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      idTipoSangre: new FormControl(null, Validators.required)


    })


  }

  //Estos dos metodos lo que hacen es inicializar el valor que hay en las tablas 
  private cargarTipoIdentificacion() {
    this.servicioTipoIdentificacion.listarTodos().subscribe(res =>{
      //si nos retorna bien le damos valor selectselectTipoIdentificacion con el 'res'
      this.selectTipoIdentificacion = res;
    }, error =>{
      console.log("Ha habido un error al cargar los datos");
    }
    )
  }

  private cargarTipoSangre(){
    this.servicioTipoSangre.listarTodos().subscribe(res => {
      this.selectTipoSangre = res;
    }, error => {
      console.log("Ha ocurrido un error al cargar los tipos de sangre");
    });
  }

  public guardar(){
    //recoge valores del formulario
    let tipoIdentificacion: TipoIdentificacion= new TipoIdentificacion();
    tipoIdentificacion.id= this.formEstudiante.controls['idTipoIdentificacion'].value;

    let tipoSangre: TipoSangre = new TipoSangre();
    tipoSangre.id= this.formEstudiante.controls['idTipoSangre'].value;

    let estudiante: Estudiante = new Estudiante();
    estudiante.tipoIdentificacion = tipoIdentificacion;
    estudiante.numeroIdentificacion= this.formEstudiante.controls['numeroIdentificacion'].value;
    estudiante.nombre= this.formEstudiante.controls['nombre'].value;
    estudiante.apellido= this.formEstudiante.controls['apellido'].value;
    estudiante.fechaNacimiento= this.formEstudiante.controls['fechaNacimiento'].value;
    estudiante.tipoSangre= tipoSangre;



    //reutilizamos el metodo guardar
    //si es diferente de 0 es porque esta editando sino es porque esta registrando un nuevo estudiante
    if(this.data.id != 0){
      estudiante.id = this.data.id;
      this.actualizar(estudiante);

    }else{
      this.registrar(estudiante);
    }


   
    this.registrar(estudiante)


  }

  public registrar(estudiante: Estudiante){
   this.servicioEstudiante.registrar(estudiante).subscribe( res => {
       alert("Se ha guardado correctamente")
       this.dialogRef.close(true);
    }, error =>{
      console.log(error)
     }

   )
  }

  private cargarDatosEstudiante(){

    if( this.data.id !=0){
      this.servicioEstudiante.listarPorId(this.data.id).subscribe(res=>{
        //cuando haga la peticion correctamente accedemos a los datos formEstudiante
        this.formEstudiante.setValue({

          idTipoIdentificacion: res.tipoIdentificacion.id ,
          numeroIdentificacion: res.numeroIdentificacion,
          nombre: res.nombre,
          apellido: res.apellido,
          fechaNacimiento: res.fechaNacimiento,
          idTipoSangre: res.tipoSangre.id

        }

        )

     
      }, error=>{
        console.log("No se han cargado los datos del estudiante")
      })
    }


  }

  private actualizar(estudiante:Estudiante){
    this.servicioEstudiante.registrar(estudiante).subscribe( res => {
     
      this.dialogRef.close(true);
   }, error =>{
     console.log(error)
    }

  )

  }


   
    
  




}