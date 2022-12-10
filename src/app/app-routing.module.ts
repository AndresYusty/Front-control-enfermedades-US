import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarEnfermedadesComponent } from './gestionar-enfermedades/gestionar-enfermedades.component';
import { GestionarEstudiantesComponent } from './gestionar-estudiantes/gestionar-estudiantes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent}, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante
  {path:'login', component: LoginComponent},
  {path: 'gestionar-estudiantes', component: GestionarEstudiantesComponent}, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante
  {path: 'gestionar-enfermedades', component: GestionarEnfermedadesComponent }, //cuando no escriba nada = va a redirigir al componente de Gestionar estudiante

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
