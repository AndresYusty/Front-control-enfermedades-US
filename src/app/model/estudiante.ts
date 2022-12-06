import { TipoIdentificacion } from "./tipo-identificacion";
import { TipoSangre } from "./tipo-sangre";

export class Estudiante {

    public id!: number;
    public tipoIdentificacion!: TipoIdentificacion;
    public numeroIdentificacion!: String;
    public nombre!: String;
    public apellido!: String;
    public fechaNacimiento!: Date;
    public tipoSangre!: TipoSangre;

    

    
}
