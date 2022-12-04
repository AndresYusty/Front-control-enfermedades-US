import { TipoIdentificacion } from "./tipo-identificacion";
import { TipoSangre } from "./tipo-sangre";

export class Estudiante {

    public id!: number;
    public numeroIdentificacion!: String;
    public nombre!: String;
    public apellido!: String;
    public fechaNacimiento!: Date;
    public tipoIdentificacion!: TipoIdentificacion;
    public tipoSangre!: TipoSangre;

    

    
}
