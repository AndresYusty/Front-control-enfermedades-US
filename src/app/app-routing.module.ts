import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarEnfermedadesComponent } from './gestionar-enfermedades/gestionar-enfermedades.component';
import { GestionarEstudiantesComponent } from './gestionar-estudiantes/gestionar-estudiantes.component';

const routes: Routes = [
  {path:'', component: GestionarEstudiantesComponent}, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante
  {path: 'gestionar-estudiantes', component: GestionarEstudiantesComponent}, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante
  {path: 'gestionar-enfermedades', component: GestionarEnfermedadesComponent }, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
